const { publishToCentral } = require('stremio-addon-sdk')
require("dotenv").config()
const searchVideo = require("./src/search")
const MANIFEST = require('./manifest');
const landing = require("./src/landingTemplate");
const videos = require("./src/videos");
const Path = require("path");
const express = require("express");
const app = express();
const header = require('./header');
const fs = require('fs')
const subsrt = require('subtitle-converter');
const path = require('path');
const ass2srt = require('ass-to-srt');
const Axios = require('axios')
const { setupCache } = require("axios-cache-interceptor");
const NodeCache = require("node-cache");
const scrapeProxy = require("./src/scrapeProxyCookie");
const catalogs = require("./src/catalogs.json");
const instance = Axios.create();
const axios = setupCache(instance);

const myCache = new NodeCache({ stdTTL: 30 * 60, checkperiod: 300 });

const CACHE_MAX_AGE = 4 * 60 * 60; // 4 hours in seconds
const STALE_REVALIDATE_AGE = 4 * 60 * 60; // 4 hours
const STALE_ERROR_AGE = 7 * 24 * 60 * 60; // 7 days

app.use(express.static(path.join(__dirname, "static")));

var meta = [];
var subs = [];



var respond = function (res, data) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.send(data);
};

app.get('/', function (req, res) {
    res.set('Content-Type', 'text/html');
    res.send(landing(MANIFEST));
});

app.get("/:userConf?/configure", function (req, res) {
    if (req.params.userConf !== "addon") {
        res.redirect("/addon/configure")
    } else {
        res.set('Content-Type', 'text/html');
        const newManifest = { ...MANIFEST };
        res.send(landing(newManifest));
    }
});

app.get('/manifest.json', function (req, res) {
    const newManifest = { ...MANIFEST };
    // newManifest.behaviorHints.configurationRequired = false;
    newManifest.behaviorHints.configurationRequired = true;
    respond(res, newManifest);
});
app.get('/:userConf/manifest.json', function (req, res) {
    try {
        const newManifest = { ...MANIFEST };
        if (!((req || {}).params || {}).userConf) {
            newManifest.behaviorHints.configurationRequired = true;
            respond(res, newManifest);
        } else if (req.params.userConf === "store") {
            newManifest.behaviorHints.configurationRequired = true;
            respond(res, newManifest);
        }
        else {
            newManifest.behaviorHints.configurationRequired = false;
            respond(res, newManifest);
        }
    } catch (error) {
        console.log(error);
    }
});

app.get("/addon/catalog/:type/:id/genre=:genre", async (req, res, next) => {
    var { type, id, genre } = req.params;
    var metaData = [];
    var values = [];
    id = id.replace(".json", "");
    genre = genre.replace(".json", "");
    if (id == "animecix") {
        const catalogGenres = catalogs[genre];
        var getUrl = `${process.env.API_HOST}/titles?type=${type}&genre=${catalogGenres}&onlyStreamable=true&page=1&perPage=72`
        try {
            await axios.get(getUrl, { headers: header }).then((value) => {
                if (value && value.status == 200 && value.statusText == "OK") {
                    if (value && typeof (value.data.pagination.data) !== "undefined") {
                        values = value.data.pagination.data;
                    }
                }
            })

            for await (const element of values) {
                if (!String(element.id).includes("0-")) {
                    element.id = "0-" + element.id;
                }
                element.name_english = element.name_english == '' ? element.name : element.name_english;

                if (element.type === null || element.type === '') {
                    element.type = element.title_type === "anime" ? "series" : element.title_type;
                }

                if (type === element.type) {
                    var value = {
                        id: element.id,
                        type: element.type,
                        name: element.name_english,
                        poster: element.poster,
                        description: element.description,
                        genres: []
                    }
                    element.genres.forEach((data) => {
                        value.genres.push(data.display_name);
                    })
                    metaData.push(value);
                }
            }
            respond(res, { metas: metaData });
        } catch (error) {
            if (error) console.log(error);
        }
    }


})



app.get("/addon/catalog/:type/:id/search=:search", async (req, res, next) => {
    try {
        var { type, id, search } = req.params;
        search = search.replace(".json", "");
        if (id == "animecix") {
            var metaData = [];

            var cached = myCache.get(search + "-" + type);
            if (cached) {
                respond(res, { metas: cached, cacheMaxAge: CACHE_MAX_AGE, staleRevalidate: STALE_REVALIDATE_AGE, staleError: STALE_ERROR_AGE });
            }
            var anime = await searchVideo.SearchAnime(search);

            for await (const element of anime) {
                if (!String(element.id).includes("0-")) {
                    element.id = "0-" + element.id;
                }


                element.name_english = element.name_english == '' ? element.name : element.name_english;

                if (element.type === null || element.type === '') {
                    element.type = element.title_type === "anime" ? "series" : element.title_type;
                }
                if (type === element.type) {
                    var value = {
                        id: element.id,
                        type: element.type,
                        name: element.name_english,
                        poster: element.poster,
                        description: element.description,
                        genres: []
                    }
                    element.genres.forEach((data) => {
                        value.genres.push(data.display_name);
                    })
                    metaData.push(value);
                }
            }
            myCache.set(search + "-" + type, metaData);
            respond(res, { metas: metaData, cacheMaxAge: CACHE_MAX_AGE, staleRevalidate: STALE_REVALIDATE_AGE, staleError: STALE_ERROR_AGE });
        } else {
            respond(res, { metas: [] });

        }
    } catch (error) {
        if (error) console.log(error);
    }

})

app.get('/addon/meta/:type/:id/', async (req, res, next) => {
    try {
        var { type, id } = req.params;
        id = id.replace(".json", "");
        if (id) {

            var findId = String(id).substring(2).replace(".json", "");
            var cached = myCache.get(findId);
            if (cached) {
                respond(res, { meta: cached, cacheMaxAge: CACHE_MAX_AGE, staleRevalidate: STALE_REVALIDATE_AGE, staleError: STALE_ERROR_AGE });
            }
            var metaObj = {};

            var find = await searchVideo.FindAnimeDetail(findId);
            if (typeof (find.name_english) !== "undefined") {
                find.name_english = find.name_english == '' ? find.name : find.name_english;
            }

            if (find.type === null || find.type === '') {
                find.type = find.title_type === "anime" ? "series" : find.title_type;
            }


            metaObj = {
                id: id,
                type: type,
                name: find.name_english,
                background: find.backdrop,
                country: find.country || "JP",
                genres: [],
                season: find.seasons.length || undefined,
                videos: [] || undefined,
                imdbRating: Number(find.rating),
                description: find.description,
                releaseInfo: String(find.year),
                poster: find.poster,
                posterShape: 'poster',

            }
            // anime genres
            find.genres.forEach(element => {
                metaObj.genres.push(element.display_name)
            });
            //series or movie check
            if (type === "series") {
                for (let i = 0; i < find.seasons.length; i++) {
                    var animes = await searchVideo.SearchVideoDetail(type, findId, find.name_english, i + 1);
                    if (animes && typeof (animes) !== "undefined") {
                        animes.forEach(element => {
                            if (!String(element.id).includes("0-")) {
                                element.id = "0-" + element.id;
                            }
                            metaObj.videos.push({
                                id: element.id,
                                _id: findId,
                                title: element.name || `Bölüm ${element.episode_number}`,
                                released: new Date(element.release_date) || "2024-10-09T00:00:00.000Z",
                                season: element.season_number,
                                episode: element.episode_number,
                                overview: element.description || "",
                                thumbnail: element.poster
                            });
                        });
                    }
                }
                meta.push(metaObj.videos);
                myCache.set(findId, metaObj);
                respond(res, { meta: metaObj, cacheMaxAge: CACHE_MAX_AGE, staleRevalidate: STALE_REVALIDATE_AGE, staleError: STALE_ERROR_AGE });
            } else {
                //movie
                var animes = await searchVideo.SearchVideoDetail(type, findId, find.name_english, 1);
                var videos = [];
                if (!String(animes.id).includes("0-")) {
                    animes.id = "0-" + animes.id;
                }
                videos.push({
                    id: animes.id,
                    _id: findId,
                    anime: animes

                });
                meta.push(videos);
                myCache.set(findId, metaObj);
                respond(res, { meta: metaObj, cacheMaxAge: CACHE_MAX_AGE, staleRevalidate: STALE_REVALIDATE_AGE, staleError: STALE_ERROR_AGE });
            }
        } else {
            respond(res, { meta: {} });
        }
    } catch (error) {
        if (error) console.log(error);
    }

})



app.get('/addon/stream/:type/:id/', async (req, res, next) => {
    try {
        var { type, id } = req.params;
        id = String(id).replace(".json", "");
        if (id) {
            var stream = [];
            var detail = {};
            var typeValue;

            for (let i = 0; i < meta.length; i++) {
                var value = meta[i].filter(e => e.id == id)[0];
                if (value) {
                    detail = value;
                    break;
                }
            }

            if (typeof (detail) != "undefined") {
                // initialize defaults
                let streamLinks = [];
                let typeValue = [];

                if (type === "series") {
                    const getVideo = await videos.GetVideos(detail._id, detail.episode, detail.season);
                    if (Array.isArray(getVideo) && getVideo.length > 0) {
                        streamLinks = await videos.ListVideos(getVideo);
                        typeValue = getVideo; // use raw provider objects for subtitle/caption checks
                    }
                } else {
                    if (detail.anime && Array.isArray(detail.anime.videos) && detail.anime.videos.length > 0) {
                        streamLinks = await videos.ListVideos(detail.anime.videos);
                        typeValue = detail.anime.videos; // use raw provider objects for subtitle/caption checks
                    }
                }

                for (const element of typeValue) {
                    element.extra = String(element.extra || '').trim().toLocaleLowerCase();
                    element.name = String(element.name || '').trim().toLocaleLowerCase();
                    if (element.extra === 'yapay çeviri' || element.extra === 'yapay çeviri v3' || element.extra === '' || element.extra === "null") {
                        if (element.name === "tau video") {
                            if (element && Array.isArray(element.captions) && typeof (element.captions[0]) !== "undefined") {
                                subs.push({
                                    id: id,
                                    lang: "tur",
                                    url: element.captions[0].url,
                                })
                                break;
                            }
                        }
                    }
                }

                streamLinks.forEach(element => {
                    if (element.support == "stremio") {
                        stream.push({
                            url: element.parseUrl,
                            name: element.label + "\n" + element.subName,
                            description: element.videoProvider + "\n" + element.size,
                        });
                    } else {
                        stream.push({
                            externalUrl: element.url,
                            name: "Animecix \n" + element.subName,
                            description: element.videoProvider + "\n" + element.size,
                        });
                    }
                });
                respond(res, { streams: stream, cacheMaxAge: CACHE_MAX_AGE, staleRevalidate: STALE_REVALIDATE_AGE, staleError: STALE_ERROR_AGE })
            }

        }
    } catch (error) {
        if (error) console.log(error);
    }
})

function CheckSubtitleFoldersAndFiles() {
    try {
        const folderPath = path.join(__dirname, "static", "subs");

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        const files = fs.readdirSync(folderPath);

        if (files.length > 500) {
            files.forEach((file) => {
                const filePath = Path.join(folderPath, file);
                const fileStats = fs.statSync(filePath);

                if (fileStats.isFile()) {
                    fs.unlinkSync(filePath);
                } else if (fileStats.isDirectory()) {
                    // Dizin içinde dosya varsa onları da silmek için
                    fs.rmdirSync(filePath, { recursive: true });
                }
            });
        }
    } catch (error) {
        console.log(error);
    }

}




app.get('/addon/subtitles/:type/:id/:query?.json', async (req, res, next) => {
    try {
        var { type, id } = req.params;
        id = id.replace(".json", "");
        if (id) {

            var subtitleHeader = {
                "User-Agent": `${process.env.USERAGENT}`,
                "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "Windows",
            }


            for await (const element of subs) {
                if (id === element.id) {
                    var localUrl = process.env.HOSTING_URL + `/subs/${id}/${id}.srt`;
                    const subtitles = {
                        id: "animecix-" + id,
                        lang: "tur",
                        url: localUrl
                    }
                    CheckSubtitleFoldersAndFiles();
                    //video id bulunduktan sonra yapılacaklar
                    if (fs.existsSync(path.join(__dirname, "static", "subs", id))) {
                        respond(res, { subtitles: [subtitles] })
                    }

                    var downloadUrl = `${process.env.SUBTITLEAI_URL + new URL(element.url).pathname}`;

                    var subtitle = "";

                    
                    var response = await axios.get(downloadUrl, { method: "GET", headers: subtitleHeader });
                    if (response && response.status == 200 && response.statusText == "OK") {
                        if (Path.extname(downloadUrl) !== ".srt" && Path.extname(downloadUrl) !== ".ass") {
                            const outputExtension = '.srt';
                            const options = {
                                removeTextFormatting: true,
                            };

                            subtitle = subsrt.convert(response.data, outputExtension, options).subtitle;
                        } else if (Path.extname(downloadUrl) === ".ass") {
                            subtitle = ass2srt(response.data)
                        } else if (Path.extname(downloadUrl) === ".srt") {
                            subtitle = response.data;
                        }

                        if (subtitle !== '') {
                            if (!fs.existsSync(path.join(__dirname, "static", "subs", id))) {
                                fs.mkdirSync(path.join(__dirname, "static", "subs", id), { recursive: true });
                            }

                            fs.writeFileSync(`./static/subs/${id}/${id}.srt`, subtitle, { encoding: "utf8" });
                            respond(res, { subtitles: [subtitles], cacheMaxAge: CACHE_MAX_AGE, staleRevalidate: STALE_REVALIDATE_AGE, staleError: STALE_ERROR_AGE })

                        }
                    }
                }
            }
        }
    } catch (error) {
        if (error) console.log(error);
    }
})


if (module.parent) {
    module.exports = app;
} else {
    app.listen(process.env.PORT || 7000, function (err) {
        if (err) {
            return console.error("Error :" + err);
        }
        console.log(`extension running port : ${process.env.PORT || 7000}`)
    });
}


//publishToCentral(`${process.env.HOSTING_URL}/manifest.json`);

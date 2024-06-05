const header = require("./header");
const parser = require("./parser");
const tauvideoapi = require("./api/tauvideoapi");
require("dotenv").config({ path: "../.env" });
const Axios = require('axios')
const axiosRetry = require("axios-retry").default;
const { setupCache } = require("axios-cache-interceptor");


const instance = Axios.create();
const axios = setupCache(instance);
axiosRetry(axios, { retries: 2 });

async function GetVideos(id, episode, season) {
    var values = [];
    if (id > 0 && episode > 0 && season > 0) {
        await axios.get(`https://${process.env.PROXY_URL}/secure/episode-videos?titleId=${id}&episode=${episode}&season=${season}`, { headers: header }).then((value) => {
            if (value && value.status == 200 && value.statusText == "OK") {
                values = value.data;
            }
        })
    }

    return values;
}


async function ListVideos(list) {
    var values = [];

    for (let videos of list) {
        videos.name = String(videos.name).trim().toLowerCase();
        switch (videos.name) {
            case "tau video":
                var links = await tauvideoapi.VideoApi(videos.url);
                links.urls.forEach(videos2 => {
                    var size = videos2.size / 1024000;
                    var newUrl = new URL(videos2.url);
                    var linksTau = tauvideoapi.ParseUrl(newUrl.hostname);
                    videos2.url = `https://${linksTau}${newUrl.pathname}`
                    size = Math.round(size).toString();
                    values.push({
                        url: videos.url,
                        parseUrl: videos2.url,
                        label: videos2.label,
                        support: "stremio",
                        size: size + " MB",
                        subName: videos.extra,
                        videoProvider: "tau video || Stremiodan izlenebilir"
                    })
                });

                break;

            default:
                var url = parser.ParseUrlVideoProviders(videos.url, videos.name);
                values.push({
                    url: url,
                    support: "browser",
                    size: "Boyut Bilinmiyor",
                    subName: videos.extra,
                    videoProvider: `${videos.name} || Tarayıcıdan izlenebilir`
                })
                break;
        }

    }
    return values;
}




module.exports = { GetVideos, ListVideos }
const header = require("../header");
const tauvideoapi = require("./api/tauvideoapi");
require("dotenv").config();
const Axios = require('axios')
const axiosRetry = require("axios-retry").default;
const { setupCache } = require("axios-cache-interceptor");


const instance = Axios.create();
const axios = setupCache(instance);
axiosRetry(axios, { retries: 2 });

async function GetVideos(id, episode, season) {
    var values = [];
    try {
        if (id > 0 && episode > 0 && season > 0) {
            await axios.get(`https://${process.env.API_HOST}/episode-videos?titleId=${id}&episode=${episode}&season=${season}`, { headers: header }).then((value) => {
                if (value && value.status == 200 && value.statusText == "OK") {
                    values = value.data;
                }
            }).catch((error) => {
                console.log(error);
            })
        }

        return values;
    } catch (error) {
        console.log(error);
    }

}


async function ListVideos(list) {
    var values = [];
    try {
        for (let videos of list) {
            videos.name = String(videos.name).trim().toLowerCase();
            switch (videos.name) {
                case "tau video":
                    var embedId = videos.url.replace("https://tau-video.xyz/embed/","")
                    var links = await tauvideoapi.VideoApi(embedId);
                    links.urls.forEach(videos2 => {
                        var size = videos2.size / 1024000;
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
                    values.push({
                        url: videos.url,
                        support: "browser",
                        size: "Boyut Bilinmiyor",
                        subName: videos.extra,
                        videoProvider: `${videos.name} || Tarayıcıdan izlenebilir`
                    })
                    break;
            }
        }
        return values;
    } catch (error) {
        console.log(error);
    }
}




module.exports = { GetVideos, ListVideos }
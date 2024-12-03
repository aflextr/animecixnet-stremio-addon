const header = require("../../header");
const Axios = require('axios')
const axiosRetry = require("axios-retry").default;
const { setupCache } = require("axios-cache-interceptor");


const instance = Axios.create();
const axios = setupCache(instance);
axiosRetry(axios, { retries: 2 });


async function VideoApi(code) {
    try {
        var values = [];
        if (code.length > 0) {
            var gatewayHeaders = {
                    "Content-Type": "application/json",
                    "Cookie": "tau-video_xyz=%7B%22HttpHost%22%3A%22tau-video.xyz%22%2C%22Protokol%22%3A%22http%22%2C%22Port%22%3A80%2C%22KulAdSifre%22%3Anull%2C%22UrlAdresi%22%3A%22%5C%2Fapi%5C%2Fvideo%5C%2F65e08b2835424e1e68a23ae0%22%2C%22GetVeri%22%3Anull%2C%22GitOpjeId%22%3Anull%2C%22DnsAdresi%22%3A0%2C%22URL_Adresi%22%3A%22http%3A%5C%2F%5C%2Ftau-video.xyz%5C%2Fapi%5C%2Fvideo%5C%2F65e08b2835424e1e68a23ae0%22%2C%22GirisIP%22%3A%22104.21.234.159%22%7D",
                    "Referer": "https://tau-video-dot-xyz.gateway.web.tr/",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
                    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Microsoft Edge\";v=\"120\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "Windows",
            }
            code = `https://tau-video-dot-xyz.gateway.web.tr/api/video/${code}`;
            await axios.get(code, { headers: gatewayHeaders }).then((value) => {
                if (value && value.status == 200 && value.statusText == "OK") {
                    values = value.data;
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    } catch (error) {
        console.log(error);
    }


    return values;
}

module.exports = { VideoApi };
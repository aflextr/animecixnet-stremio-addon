const Axios = require('axios')
const axiosRetry = require("axios-retry").default;
const { setupCache } = require("axios-cache-interceptor");
const scrapeCookie = require("../scrapeProxyCookie");

var cookie = "";
scrapeCookie.fetchWithCookies("https://tau-video-dot-xyz.gateway.web.tr").then((value)=>{
    if (value) {
        cookie = value;
    }
})


const instance = Axios.create();
const axios = setupCache(instance);
axiosRetry(axios, { retries: 2 });


async function VideoApi(code) {
    try {
        var values = [];
        if (code.length > 0) {
            var gatewayHeaders = {
                    "Content-Type": "application/json",
                    "Cookie": cookie,
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
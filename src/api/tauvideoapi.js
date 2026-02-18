const Axios = require('axios')
const { setupCache } = require("axios-cache-interceptor");

const instance = Axios.create();
const axios = setupCache(instance);


async function VideoApi(code) {
    try {
        var values = [];
        if (code.length > 0) {
            var Headers = {
                "Content-Type": "application/json",
                "User-Agent": `${process.env.USERAGENT}`,
            }
            code = `https://tau-video.xyz/api/video/${code}`;
            await axios.get(code, { headers: Headers }).then((value) => {
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
require("dotenv").config({ path: "../.env" })
const header = {
    'Content-Type': "application/json",
    "Cookie": "animecix_net=%7B%22HttpHost%22%3A%22animecix.net%22%2C%22HttpDomain%22%3A%22animecix.net%22%2C%22Protokol%22%3A%22http%22%2C%22Port%22%3A80%2C%22KulAdSifre%22%3Anull%2C%22UrlAdresi%22%3A%22%5C%2Fsecure%5C%2Fhomepage%5C%2Flists%22%2C%22GetVeri%22%3Anull%2C%22GitOpjeId%22%3Anull%2C%22DnsAdresi%22%3A0%2C%22URL_Adresi%22%3A%22http%3A%5C%2F%5C%2Fanimecix.net%5C%2Fsecure%5C%2Fhomepage%5C%2Flists%22%2C%22GirisIP%22%3A%22104.26.8.126%22%7D",
    "Referer": `https://${process.env.PROXY_URL}/`,
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
    "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "Windows",
    "x-e-h": "AOmdsKU3/djEchUskaCLKEQyuHsN1vQB2qIavJe0vPItShmJ+aBEw==.mmdn3iLFXhHzZzTp"
}

module.exports = header;


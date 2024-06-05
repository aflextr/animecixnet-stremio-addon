require("dotenv").config({path:"../.env"})
const header = {
    'Content-Type': "application/json",
"Cookie": "theme=Dark; cf_clearance=.hS7P5uzyqjpUf3SmSzoS1DCt7qhEG70akkKyFV3FZE-1706295387-1-AbFlnV6Lc+IaRnFEb37Zc8sEeJp2c74F5xmYQc+nDHP04/dQhx3BaHKE8YLk/bD4RWbRTNGA3lIfiF/WyBIyZy8=; animecix_net=%7B%22HttpHost%22%3A%22animecix.net%22%2C%22HttpDomain%22%3A%22animecix.net%22%2C%22Protokol%22%3A%22https%22%2C%22Port%22%3A443%2C%22KulAdSifre%22%3Anull%2C%22UrlAdresi%22%3A%22%5C%2F%22%2C%22GetVeri%22%3Anull%2C%22GitOpjeId%22%3Anull%2C%22DnsAdresi%22%3A%2211%22%2C%22URL_Adresi%22%3A%22https%3A%5C%2F%5C%2Fanimecix.net%5C%2F%22%2C%22GirisIP%22%3A%22104.26.8.126%22%7D",
"Referer":`https://${process.env.PROXY_URL}/`,
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
"sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
"sec-ch-ua-mobile": "?0",
"sec-ch-ua-platform": "Windows"
}

module.exports = header;


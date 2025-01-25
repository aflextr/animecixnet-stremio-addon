const axios = require('axios');
const tough = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

const cookieJar = new tough.CookieJar();
const client = wrapper(axios.create({ jar: cookieJar }));

async function fetchWithCookies(url) {
  try {
    var cookieHeader = {
      "Referer": url,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
      "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "Windows",
    }
    await client.get(url, { headers: cookieHeader });

    var cookies = cookieJar.getCookiesSync(url);
    cookies = cookies.map(cookie => cookie.cookieString()).join('; ');
    return cookies
  } catch (error) {
    console.error('Error fetching the URL:', error);
  }
}

module.exports = { fetchWithCookies };
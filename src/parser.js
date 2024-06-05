
function ParseUrlVideoProviders(url, provider) {
    var value;
    var newUrl = new URL(url);
    provider = String(provider).trim().toLowerCase();
    switch (provider) {
        case "sibnet":
            value = `https://video.sibnet.ru${newUrl.pathname}${newUrl.search}`;
            break;
        case "streamtape":
            value = `https://streamtape.com${newUrl.pathname}${newUrl.search}`;
            break;
        case "abcvideo":
            value = `https://abcvideo.cc${newUrl.pathname}${newUrl.search}`;
            break;
        case "vudeo":
            value = `https://vudeo.net${newUrl.pathname}${newUrl.search}`;
            break;
        case "doodstream":
            value = `https://dood.watch${newUrl.pathname}${newUrl.search}`;
            break;
        case "cloudvideo":
            value = `https://cloudvideo.tv${newUrl.pathname}${newUrl.search}`;
            break;
        case "uqload":
            value = `https://uqload.com${newUrl.pathname}${newUrl.search}`;
            break;
        case "voe":
            value = `https://voe.sx${newUrl.pathname}${newUrl.search}`;
            break;
        case "mail":
            value = `https://my.mail.ru${newUrl.pathname}${newUrl.search}`;
            break;
        case "ok":
            value = `https://odnoklassniki.ru${newUrl.pathname}${newUrl.search}`;
            break;
        case "dailymotion":
            value = `https://www.dailymotion.com${newUrl.pathname}${newUrl.search}`;
            break;
        default:
            break;
    }

    return value;
}

module.exports = { ParseUrlVideoProviders };
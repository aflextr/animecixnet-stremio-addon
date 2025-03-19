require("dotenv").config()
const manifest = {

    id: 'org.animecixnet-stremio-addon',
    version: '1.2.1',

    name: 'AnimeciX',
    description: "AnimeciX'ten türkçe altyazılı animeleri stremionuza getirir.",

    contactEmail: "eyup.elitass@gmail.com",
    logo: `${process.env.HOSTING_URL}/images/animecix.png`,
    background: `${process.env.HOSTING_URL}/images/background.png`,
    behaviorHints: {
        configurable: true,
        configurationRequired: true,
    },
    config: [{
        key: "animecix",
        required: false
    }],
    catalogs: [{
        type: "series",
        id: "animecix",
        name: "AnimeciX Dizileri",
        extra: [{
            name: "search",
            isRequired: false
        },{
            name: "genre",
            isRequired: false,
            options: [
                "Dram",
                "Aksiyon",
                "Gerilim",
                "Komedi",
                "Bilim Kurgu",
                "Korku",
                "Gizem",
                "Romantik",
                "Tarihî",
                "Büyü",
                "Spor",
                "Isekai",
                "Askerî",
                "Dedektif",
                "Ölüm",
                "Gizli Organizasyon",
                "Ecchi",
                "Harem",
                "Ters Harem",
                "Vampir",
                "Kan, Vahşet",
                "Shounen",
                "Shounen Ai",
                "Seinen",
                "Canavar",
                "Doğaüstü",
                "Şeytan",
                "İntikam",
                "Zaman Yolculuğu",
                "Okul",
                "Uzay",
                "Shoujo",
                "Oyun",
                "Samuray",
                "Ninja",
                "Yaşamdan Kesitler",
                "İş Hayatı",
                "Dövüş Sanatları",
                "Yuri",
                "Yaoi"
              ]
        }],
        genres: [
            "Dram",
            "Aksiyon",
            "Gerilim",
            "Komedi",
            "Bilim Kurgu",
            "Korku",
            "Gizem",
            "Romantik",
            "Tarihî",
            "Büyü",
            "Spor",
            "Isekai",
            "Askerî",
            "Dedektif",
            "Ölüm",
            "Gizli Organizasyon",
            "Ecchi",
            "Harem",
            "Ters Harem",
            "Vampir",
            "Kan, Vahşet",
            "Shounen",
            "Shounen Ai",
            "Seinen",
            "Canavar",
            "Doğaüstü",
            "Şeytan",
            "İntikam",
            "Zaman Yolculuğu",
            "Okul",
            "Uzay",
            "Shoujo",
            "Oyun",
            "Samuray",
            "Ninja",
            "Yaşamdan Kesitler",
            "İş Hayatı",
            "Dövüş Sanatları",
            "Yuri",
            "Yaoi"
          ]
    },
    {
        type: "movie",
        id: "animecix",
        name: "AnimeciX Filmleri",
        extra: [{
            name: "search",
            isRequired: false
        },{
            name: "genre",
            isRequired: false,
            options: [
                "Dram",
                "Aksiyon",
                "Gerilim",
                "Komedi",
                "Bilim Kurgu",
                "Korku",
                "Gizem",
                "Romantik",
                "Tarihî",
                "Büyü",
                "Spor",
                "Isekai",
                "Askerî",
                "Dedektif",
                "Ölüm",
                "Gizli Organizasyon",
                "Ecchi",
                "Harem",
                "Ters Harem",
                "Vampir",
                "Kan, Vahşet",
                "Shounen",
                "Shounen Ai",
                "Seinen",
                "Canavar",
                "Doğaüstü",
                "Şeytan",
                "İntikam",
                "Zaman Yolculuğu",
                "Okul",
                "Uzay",
                "Shoujo",
                "Oyun",
                "Samuray",
                "Ninja",
                "Yaşamdan Kesitler",
                "İş Hayatı",
                "Dövüş Sanatları",
                "Yuri",
                "Yaoi"
              ]
        }],
        genres: [
            "Dram",
            "Aksiyon",
            "Gerilim",
            "Komedi",
            "Bilim Kurgu",
            "Korku",
            "Gizem",
            "Romantik",
            "Tarihî",
            "Büyü",
            "Spor",
            "Isekai",
            "Askerî",
            "Dedektif",
            "Ölüm",
            "Gizli Organizasyon",
            "Ecchi",
            "Harem",
            "Ters Harem",
            "Vampir",
            "Kan, Vahşet",
            "Shounen",
            "Shounen Ai",
            "Seinen",
            "Canavar",
            "Doğaüstü",
            "Şeytan",
            "İntikam",
            "Zaman Yolculuğu",
            "Okul",
            "Uzay",
            "Shoujo",
            "Oyun",
            "Samuray",
            "Ninja",
            "Yaşamdan Kesitler",
            "İş Hayatı",
            "Dövüş Sanatları",
            "Yuri",
            "Yaoi"
          ]
    }],
    resources: ['addon_catalog','catalog','stream', 'meta', 'subtitles'],
    types: ["movie", 'series'],
    idPrefixes: ["0-"]
}

module.exports = manifest;
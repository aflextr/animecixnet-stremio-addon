require("dotenv").config()
const manifest = {

    id: 'org.animecixnet-stremio-addon',
    version: '1.2.0',

    name: 'AnimeciX',
    description: "AnimeciX'ten türkçe altyazılı animeleri stremionuza getirir.",

    contactEmail: "eyup.elitass@gmail.com",
    logo: `https://${process.env.HOSTING_URL}/images/animecix.png`,
    background: `https://${process.env.HOSTING_URL}/images/background.png`,
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
        extra: [{
            name: "search",
            isRequired: true
        }]
    },
    {
        type: "movie",
        id: "animecix",
        extra: [{
            name: "search",
            isRequired: true
        }]
    }],
    resources: ['stream', 'meta', 'subtitles'],
    types: ["movie", 'series'],
    idPrefixes: ["0-"]
}

module.exports = manifest;
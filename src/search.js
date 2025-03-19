const header = require("../header");
require("dotenv").config()
const Axios = require('axios')
const axiosRetry = require("axios-retry").default;
const { setupCache } = require("axios-cache-interceptor");


const instance = Axios.create();
const axios = setupCache(instance);
axiosRetry(axios, { retries: 2 });


async function SearchAnime(name) {
    var values = [];
    name = String(name).replace(" ", "-");
    try {
        await axios.get(`${process.env.API_HOST}/search/${name}?limit=200`, { headers: header }).then((value) => {
            if (value && value.status == 200 && value.statusText == "OK") {
                if (value && typeof (value.data.results) !== "undefined") {
                    values = value.data.results;
                }
            }
        })

    } catch (error) {
        if (error) console.log(error);
    }
    return values;


}

async function FindAnimeDetail(id) {
    var values;
    try {
        if (id > 0) {
            await axios.get(`${process.env.API_HOST}/titles/${id}`, { headers: header }).then((value) => {
                if (value && value.status == 200 && value.statusText == "OK") {
                    values = value.data.title;
                }
            })
        }
    } catch (error) {
        if (error) console.log(error);
    }
    return values;
}

async function FindAnimeId(name, _id) {
    var values;
    name = String(name).replace(" ", "-");
    try {
        await axios.get(`${process.env.API_HOST}/search/${name}?limit=200`, { headers: header }).then((value) => {
            if (value && value.status == 200 && value.statusText == "OK") {
                for (const element of value.data.results) {
                    if (element._id === _id) {
                        values = element.id;
                    }
                }
            }
        })
    } catch (error) {
        console.log(error);
    }

    return values;
}

async function SearchVideoDetail(type, id, name, seasonNumber) {
    var values;
    try {
        if (id > 0 && name.length > 0 && seasonNumber > 0) {
            name = String(name).replace(" ", "-");
            if (type === "series") {
                await axios.get(`${process.env.API_HOST}/titles/${id}?titleId=${id}&titleName=${name}&seasonNumber=${seasonNumber}&perPage=2000`, { headers: header }).then((value) => {
                    if (value && value.status == 200 && value.statusText == "OK") {
                        if (typeof (value.data.title.season.episodePagination) !== "undefined") {
                            values = value.data.title.season.episodePagination.data;
                        }
                    }
                })
            } else {
                await axios.get(`${process.env.API_HOST}/titles/${id}?titleId=${id}&titleName=${name}`, { headers: header }).then((value) => {
                    if (value && value.status == 200 && value.statusText == "OK") {
                        values = value.data.title;
                    }
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
    return values;
}

module.exports = { SearchAnime, FindAnimeDetail, FindAnimeId, SearchVideoDetail }
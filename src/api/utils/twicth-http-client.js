const axios = require("axios").default;
const config = require("../../config");

module.exports = axios.create({
    headers: {
        Accept: "application/vnd.twitchtv.v5+json",
        "Client-ID": config.twitch.clientId
    }
});

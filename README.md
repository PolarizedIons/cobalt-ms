# Cobalt-MS

## Microservice portion of Project Cobalt

| Project      | Link                                         |
| ------------ | -------------------------------------------- |
| Bot          | https://github.com/PolarizedIons/cobalt-bot  |
| Core         | https://github.com/PolarizedIons/cobalt-core |
| MicroService | https://github.com/PolarizedIons/cobalt-ms   |
| UI           | https://github.com/PolarizedIons/cobalt-ui   |

## Usage

This is the api microservice for the frontend (UI) project. To use it, simply fill out the `.env` file (use `.env.example` as a template), or provide the appropriate environment variables and run via `yarn start`.

Output is in [pino](https://getpino.io/#/) format

## Environment Variables

| Variable                  | Description                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **PORT**                  | The port that the api server will run on                                                                                             |
| **NATS_URL**              | The [NATS](https://nats.io/) server to connect to for communication with the rest of the services.                                   |
| **TWITCH_CHANNEL_ID**     | The channel id that the bot will use as an "admin" account. Only that channel's moderators will be able to authenticate with the api |
| **TWITCH_CLIENT_ID**      | Your twitch client id. [Get yours here](https://dev.twitch.tv/console/apps)                                                          |
| **TWITCH_CLIENT_SECRET**  | Your twitch client secret. Retrieved at the same page as your **client id**                                                          |
| **TWITCH_CALLBACK_URL**   | The callback url (to this api server) that you registered with your twitch app                                                       |
| **FRONTEND_CALLBACK_URL** | The callback url for the frontend (UI project) to send the user after twitch authentication                                          |
| **JWT_SECRET**            | Random letters & numbers to hash the JWT token with                                                                                  |

FROM node:alpine

WORKDIR /app

RUN chown -R node:node /app
USER node

COPY package.json .
COPY yarn.lock .
RUN yarn install --prod

COPY ./src ./src

CMD ["yarn", "start"]

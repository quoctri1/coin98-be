FROM --platform=linux/amd64 node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY server.js server.js

EXPOSE 4000
CMD [ "node", "server.js" ]
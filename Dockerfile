FROM node:14.17

WORKDIR /pekbot

COPY . .

RUN npm install

CMD [ "npm", "start" ]
FROM node:18.16.1-alpine3.18


WORKDIR /app/boilerplate-adonisjs


COPY package*.json .


RUN npm install

ENV CHOKIDAR_USEPOLLING=true
COPY . .

CMD node ace serve --watch



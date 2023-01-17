FROM node:16.19-alpine


WORKDIR /app/default-project-adonis


COPY package*.json .


RUN npm install

ENV CHOKIDAR_USEPOLLING=true
COPY . .

COPY ./run-dev.sh /tmp
RUN chmod +x run-dev.sh

ENTRYPOINT ["sh", "/tmp/run-dev.sh"]



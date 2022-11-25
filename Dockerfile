FROM node:latest

LABEL author="Krisztián Kovács"

ENV NODE_ENV=development
ENV DBHOST='mssql'
ENV PORT=3001

COPY . /var/www
WORKDIR /var/www

RUN npm install

EXPOSE $PORT

ENTRYPOINT [ "npm", "run", "start:dev" ]
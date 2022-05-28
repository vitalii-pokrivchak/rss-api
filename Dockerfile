FROM node:lts-alpine

WORKDIR /app

COPY ./package.json .

COPY ./package-lock.json .

COPY src src

EXPOSE 3000

RUN npm install

ENTRYPOINT [ "npm" , "run" , "start" ]
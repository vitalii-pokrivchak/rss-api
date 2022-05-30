FROM node:lts-alpine

WORKDIR /app

COPY . .

EXPOSE $PORT

RUN npm install

ENTRYPOINT [ "npm" , "run" , "start" ]
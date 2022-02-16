FROM node:14.19.0

COPY . /app

WORKDIR /app

RUN npm i

CMD npm start

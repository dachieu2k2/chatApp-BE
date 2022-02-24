FROM node:14.19.0

COPY package* /app/

WORKDIR /app

RUN npm install

COPY . /app

CMD npm start

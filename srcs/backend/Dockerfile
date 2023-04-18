FROM node:18-alpine3.16

COPY start.sh /

WORKDIR /app

COPY ./package.json ./package-lock.json ./ 

RUN npm install

COPY  . ./

CMD ["sh", "/start.sh"]


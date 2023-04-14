FROM node:10-alpine AS build

COPY --chown=node:node package*.json ./

WORKDIR /app

RUN npm install 

COPY --chown=node:node . .

RUN npm run build
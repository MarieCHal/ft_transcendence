FROM node:18-alpine

# Install dependencies
RUN apk update && apk upgrade \
    && apk add --no-cache --quiet --update \
    	   vim curl bash zsh git postgresql-client

# Set the working directory to /app
WORKDIR /app

# install dependencies
COPY ./package.json ./package-lock.json ./

RUN npm install

# Expose the port the application will be running on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
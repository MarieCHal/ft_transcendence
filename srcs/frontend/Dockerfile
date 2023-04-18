# Base image
FROM node:18-alpine

# Install dependencies
RUN apk add --no-cache --update npm shadow


# Set working directory
WORKDIR /app

# Copy all files needed for installing dependencies
COPY --chown=node:node package*.json ./

# Run npm install
RUN npm install

# Copy the rest of the source
COPY --chown=node:node . .


EXPOSE 8000

# Start app
CMD ["npm", "run", "build"]


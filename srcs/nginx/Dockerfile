FROM nginx:1.23-alpine

# Install dependencies
RUN apk update && apk upgrade \
    && apk add --no-cache --quiet --update \
    	  openssl vim curl bash zsh git gettext

# Generate ssl certificate

# TODO: Make this work

# Expose the port the Nginx server will be running on
EXPOSE 80 443

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
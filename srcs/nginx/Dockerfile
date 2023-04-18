FROM nginx:1.23-alpine

# Install dependencies
RUN apk update && apk upgrade \
    && apk add --no-cache --quiet --update \
    	  openssl vim curl bash zsh git gettext

# Generation des certificats et cles au nom du student
RUN     mkdir -p /etc/nginx/ssl

RUN     openssl req -x509 -nodes \
        -out /etc/nginx/ssl/localhost.crt \
        -keyout /etc/nginx/ssl/localhost.key \
        -subj "/C=CH/ST=Lausanne/L=Renens/O=42/OU=42/CN=localhost"

# Expose the port the Nginx server will be running on
EXPOSE 80 443

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -subj '/C=CH/ST=Vaud/L=Renens/O=transcendance/OU=IT/CN=localhost' -keyout /certs/nginx.key -out /certs/nginx.crt


nginx -g 'daemon off;'
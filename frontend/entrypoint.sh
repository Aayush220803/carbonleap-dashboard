#!/bin/sh

# Substitute the PORT variable provided by Railway into the Nginx config
sed -i 's/listen 80;/listen '$PORT';/g' /etc/nginx/conf.d/default.conf

# Start Nginx in the foreground
exec nginx -g 'daemon off;'

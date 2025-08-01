#!/bin/sh

# Use envsubst to substitute the PORT variable into our Nginx config template
# and output it to the final Nginx config file.
envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Start Nginx in the foreground
exec nginx -g 'daemon off;'
# Stage 1: Build the React app
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:1.23-alpine

# Copy the built React app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our Nginx config template
COPY ./default.conf.template /etc/nginx/templates/

# Copy and prepare the entrypoint script
COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh

# Run the entrypoint script when the container starts
ENTRYPOINT ["/entrypoint.sh"]

# Expose port 80 as a fallback, the script will handle the dynamic PORT
EXPOSE 80
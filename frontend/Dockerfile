# Stage 1: Build the React app
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:1.23-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy and prepare the entrypoint script
COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh

# Run the entrypoint script when the container starts
ENTRYPOINT ["/entrypoint.sh"]

# We still expose 80 as a fallback for local dev, but the script will use $PORT
EXPOSE 80
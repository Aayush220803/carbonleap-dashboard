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
# Optional: Add a custom nginx config if you need to proxy API requests
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
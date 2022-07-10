FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY /dist/tweet-frontend /usr/share/nginx/html
EXPOSE 4200
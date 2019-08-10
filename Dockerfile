# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
#//////////////////////////

#FROM node:alpine as builder
#WORKDIR /app
#COPY package*.json /app/
#RUN npm install
#COPY ./ /app/
#RUN npm run build
#
## => Run container
#FROM nginx:1.15.2-alpine
#
## Nginx config
##RUN rm -rf /etc/nginx/conf.d
##COPY conf /etc/nginx
#
## Static build
#COPY --from=builder /app/build /usr/share/nginx/html/
#
## Default port exposure
#EXPOSE 80
#
## Copy .env file and shell script to container
#WORKDIR /usr/share/nginx/html
#COPY ./env.sh .
#COPY .env .
#
## Add bash
#RUN apk add --no-cache bash
#
## Make our shell script executable
#RUN chmod +x env.sh
#
## Start Nginx server
#CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]

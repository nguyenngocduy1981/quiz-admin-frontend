#production build
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf


##development build
#FROM node:latest
## set working directory
#RUN mkdir /usr/src/app
#WORKDIR /usr/src/app
## add `/usr/src/app/node_modules/.bin` to $PATH
#ENV PATH /usr/src/app/node_modules/.bin:$PATH
## install and cache app dependencies
#ADD package.json /usr/src/app/package.json
#RUN npm install
#RUN npm install react-scripts@0.9.5 -g
## add app
#ADD . /usr/src/app
## start app
#CMD ["npm", "start"]

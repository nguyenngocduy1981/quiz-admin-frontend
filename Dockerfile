#production build
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
#FROM tiangolo/node-frontend:10 as build-stage
#WORKDIR /app
#COPY package*.json /app/
#RUN npm install
#COPY ./ /app/
#RUN npm run
## Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
#FROM nginx:1.15
#COPY --from=build-stage /app/build/ /usr/share/nginx/html
## Copy the default nginx.conf provided by tiangolo/node-frontend
#COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /myapp

COPY app /myapp/
COPY config /myapp/
COPY server /myapp/
COPY package*.json /myapp/
COPY .prettierrc /myapp/
COPY .eslintrc /myapp/
COPY .prettierignore /myapp/
COPY *.js /myapp/

RUN npm install
COPY ./ /app/
RUN npm run
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /myapp/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

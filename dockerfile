FROM nginx
label maintainer "joynce"
COPY ./dist/ /usr/share/nginx/blog/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
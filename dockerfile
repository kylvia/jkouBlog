FROM nginx
label maintainer "joynce"
COPY ./dist/ /usr/share/nginx/blog/
EXPOSE 8000
FROM nginx
COPY ./dist/ /usr/share/nginx/blog/
EXPOSE 8080
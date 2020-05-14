FROM nginx

COPY ./dist/ /var/lib/docker/tmp/
COPY ./index.html /usr/share/nginx/blog/dist/index.html


EXPOSE 8000
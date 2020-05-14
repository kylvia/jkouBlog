FROM nginx


COPY ./index.html /usr/share/nginx/blog/index.html


EXPOSE 80
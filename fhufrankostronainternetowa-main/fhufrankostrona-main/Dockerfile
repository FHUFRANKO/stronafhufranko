FROM nginx:alpine
COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY ["./fhufranko-main 2/bowdowa/", "/usr/share/nginx/html"]
COPY ["./fhufranko-main 2/bowdowa/env.js.template", "/usr/share/nginx/html/env.js.template"]
COPY docker-entrypoint.d/50-gen-env.sh /docker-entrypoint.d/50-gen-env.sh

#!/bin/sh
set -eu
if [ -f /usr/share/nginx/html/env.js.template ]; then
  envsubst < /usr/share/nginx/html/env.js.template > /usr/share/nginx/html/env.js
fi
exec "$@"

FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package*.json ./
COPY apps/web/package*.json ./apps/web/

RUN npm ci

COPY apps/web ./apps/web

RUN npm run build --workspace=@ecommerce/web


FROM nginx:1.27-alpine

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
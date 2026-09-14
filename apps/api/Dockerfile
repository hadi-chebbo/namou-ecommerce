FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/db/package*.json ./packages/db/

RUN npm ci

COPY apps/api ./apps/api
COPY packages/db ./packages/db

RUN npm run build --workspace=@ecommerce/db
RUN npm run build --workspace=@ecommerce/api


FROM node:22-bookworm-slim AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/package*.json ./
COPY --from=build /app/apps/api/package*.json ./apps/api/
COPY --from=build /app/packages/db/package*.json ./packages/db/

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api ./apps/api
COPY --from=build /app/packages/db ./packages/db

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["npm", "run", "start:docker"]
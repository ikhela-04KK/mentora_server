FROM node:21-alpine AS base

# Stage builder
FROM base AS builder
# RUN apk add --no-cache libc6-compat
# RUN apt-get update && apt-get install -y postgresql-client
RUN apk update
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune api --docker

# stage installer 
FROM base AS installer
# RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
COPY --from=builder /app/apps/api/prisma ./prisma
RUN npm install
RUN npx prisma generate
# RUN npx prisma db push

# COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN npm run build --filter=api...

# final stage runner
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs
COPY --from=installer /app .

EXPOSE ${API_LOCAL_PORT}
CMD [ "node", "apps/api/dist/src/main.js"]

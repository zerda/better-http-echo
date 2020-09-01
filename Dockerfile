FROM node:alpine AS builder
COPY ./index.js ./package.json ./package-lock.json /tmp/build/
WORKDIR /tmp/build/
RUN npm install --save-prod

FROM node:alpine
COPY --from=builder /tmp/build/ /app/
WORKDIR /app/
CMD ["node", "/app/index.js"]

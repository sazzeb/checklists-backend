FROM node:alpine As development
LABEL maintainer "eko.5samuel@gmail.com"

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn global add rimraf

RUN yarn install --only=development

COPY . .

RUN yarn build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 9009
EXPOSE 6379

WORKDIR /app

COPY package*.json ./

RUN yarn install --production=true

RUN yarn global add @nestjs/cli
RUN yarn global add pm2

COPY --from=development /app/dist ./dist

CMD ["pm2-runtime", "dist/src/main.js"]
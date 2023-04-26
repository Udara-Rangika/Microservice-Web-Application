FROM node:alpine As development

WORKDIR /usr/src/billing

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build billing

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/billing

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/billing/dist ./dist

CMD ["node", "dist/apps/billing/main"]
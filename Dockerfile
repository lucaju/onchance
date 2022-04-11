# OnChance

FROM node:16.14-alpine

RUN npm install pm2 ts-node -g

WORKDIR /onchance

COPY package.json .

RUN npm install --force

COPY . .

RUN npm run production

CMD ["pm2-runtime", "ecosystem.config.js"]

EXPOSE 3000

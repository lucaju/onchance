# OnChance

FROM node:14.2.0

RUN npm install pm2 -g

WORKDIR /onchance
COPY . .

RUN npm install
RUN npm run production

CMD ["pm2", "start", "./server/index.js", "--no-daemon"]
EXPOSE 3000

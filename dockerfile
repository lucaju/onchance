# FROM node:12.13.1
# WORKDIR /onchance
# COPY package.json /onchance
# RUN npm install
# COPY . /onchance
# CMD node index.js
# EXPOSE 8082

# On Chance

FROM node

RUN npm install pm2 -g

WORKDIR /onchance

COPY . .

RUN npm install
RUN npm run production

EXPOSE 3000
CMD ["pm2", "start", "./server/index.js", "--no-daemon"]
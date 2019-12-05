FROM node:12.13.1
WORKDIR /onchance
COPY package.json /onchance
RUN npm install
COPY . /onchance
CMD node index.js
EXPOSE 8082
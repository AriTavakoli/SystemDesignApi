FROM node:12


WORKDIR /usr/server

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

# for typescript
RUN npm run build


EXPOSE 8080

CMD [ "npm", "start" ]
FROM node:20-alpine

RUN mkdir -p /backend

WORKDIR /backend

COPY serviceAccountKey.json package.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV NAME dev

CMD ["npm", "start"]
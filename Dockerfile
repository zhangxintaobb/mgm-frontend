FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --save

#TODO:need improvement
RUN npm i bootstrap@5.1.3 --save

COPY . .

RUN npm run build

ENV PORT=8081

EXPOSE $PORT

CMD ["npm", "start"]
FROM node:21-alpine
COPY ./package*.json .
RUN npm i
COPY . .
EXPOSE 3000
ENTRYPOINT [ "node", "api.js" ]

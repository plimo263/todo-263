FROM node:20-alpine3.17

WORKDIR /app
COPY . .

RUN yarn install && yarn build 

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]
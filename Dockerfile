FROM node:latest
WORKDIR /fastify-app
COPY yarn.lock package.json tsconfig.json ./
RUN yarn install
COPY src ./
CMD [ "yarn",  "serve"]
EXPOSE 8080
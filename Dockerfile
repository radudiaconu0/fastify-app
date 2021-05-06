FROM node:latest
WORKDIR /fastify-app
COPY yarn.lock package.json ./
RUN yarn install
COPY . .
EXPOSE 3000
ENV PORT=3000
CMD [ "yarn",  "serve"]

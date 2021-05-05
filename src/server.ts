import fastify from "fastify";
const app = fastify({ logger: true });

app.get("/", async (res, reply) => {
  await reply.status(200).send({
    message: "server started succesfully",
  });
});
const start = async () => {
  try {
    await app.listen({ port: 8080, host: '0.0.0.0' });
    console.log("running on port", 8080);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();

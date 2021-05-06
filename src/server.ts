import fastify, { FastifyReply, FastifyRequest } from "fastify";
import User from "./models/User";
import { connect } from "mongoose";
import { IUser } from "./models/User";
const app = fastify({ logger: true });
const connectToMogo = async () => {
  try {
    console.log("Trying to connect");
    await connect("mongodb://mongo:27017/fastify", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected");
  } catch (e) {
    console.log("Eroare", e);
  }
};

app.post<{ Body: IUser }>("/create", async (request, reply) => {
  const user: IUser = new User({
    email: request.body.email,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
  });

  await user.save();
  await reply.status(200).send({
    message: "User saved successfully",
  });
});
app.get("/get", async (request, reply) => {
  const users: Array<IUser> = await User.find();
  return users;
});
const start = async () => {
  try {
    await connectToMogo();
    const port = Number(process.env.PORT) || 3000;
    await app.listen({ port: port, host: "0.0.0.0" });
    console.log("running on port", port);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();

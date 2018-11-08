import express from "express";
import bodyParser from "body-parser";
import { graphiqlExpress, graphqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import cors from "cors";
import jwt from "jsonwebtoken";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "./models";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const SECRET = "JWTSECRET";

const app = express();
// User middleware for verifying requests in case logged in only request
const addUser = async req => {
  const token = req.headers.authorization;
  try {
    const { user } = await jwt.verify(token, SECRET);
    req.user = user;
  } catch (err) {
    if (err.message === "jwt expired") console.log("got and old token.");
  }
  req.next();
};

app.use(cors("*"));
app.use(addUser);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/api"
  })
);

app.use(
  "/api",
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      SECRET,
      user: req.user
    }
  }))
);

models.sequelize.sync().then(() => app.listen(PORT));

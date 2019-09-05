const express = require("express");

console.log('environment:', process.env.NODE_ENV)

const server = express();

server.use(express.json());

const userRouter = require("./users/userRouter");

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/users", userRouter);

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
}

server.use(logger);

module.exports = server;

import sirv from "sirv";
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
import compression from "compression";
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

app.use(bodyParser.json());
app.use(compression({ threshold: 0 }));
app.use(sirv("static", { dev }));
app.use(sapper.middleware());

app.listen(PORT, (err) => {
  if (err) console.log(err);
});

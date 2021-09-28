const express = require("express");
const cors = require("cors");
const { port } = require("./api");

const app = express();

app.set("port", port);
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require("../api/routes/user")(app);
require("../api/routes/image")(app);

module.exports = () => app;

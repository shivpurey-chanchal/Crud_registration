require("./models/db");

const express = require("express");
const path = require("path");
const exphbr = require("express-handlebars");
const bodyParser = require("body-parser");

const employeeController = require("./controller/employeeController");

var app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json())
app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbr({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.set("view engine", "hbs");

app.listen(3000, () => {
  console.log("express server started at port 3000");
});
app.use("/employee", employeeController);

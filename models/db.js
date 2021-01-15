const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/EmployeeDB",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log("connection succed!");
    } else {
      console.log("connection succed!", err);
    }
  }
);
require("./employee.model");

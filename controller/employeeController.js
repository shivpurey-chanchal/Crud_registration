const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Employee = mongoose.model("employee");

router.get("/", (req, res) => {
  res.render("employee/addOredit", { viewTitle: "Insert Employee" });
});
router.post("/", (req, res) => {
  console.log(req.body);
  if (req.body._id == "") {
    insertRecord(req, res);
  } else {
    upateRecord(req, res);
  }
});
function insertRecord(req, res) {
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  employee.save((err, doc) => {
    if (!err) {
      res.redirect("employee/list");
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("employee/addOredit", {
          viewTitle: "Insert Employee",
          employee: req.body,
        });
      }
      console.log("error during record insert", err);
    }
  });
}
function upateRecord(req, res) {
  Employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("employee/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("employee/addOredit", {
            viewTitle: "Update Employee",
            employee: req.body,
          });
        } else{
          console.log("error during record update", err);
        }
      }
    }
  );
}
router.get("/list", (req, res) => {
  // res.json("from list");
  Employee.find((err, docs) => {
    if (!err) {
      res.render("employee/list", {
        list: docs,
      });
    } else {
      console.log("error retriving employee list", err);
    }
  });
});
function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "fullName":
        body["fullNameError"] = err.errors[field].message;
      case "email":
        body["emailError"] = err.errors[field].message;
      case "mobile":
        body["mobileError"] = err.errors[field].message;
      case "city":
        body["cityError"] = err.errors[field].message;
    }
  }
}
router.get("/:id", (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("employee/addOredit", {
        viewTitle: "UpDate Employee",
        employee: doc,
      });
    }
  });
});
module.exports = router;

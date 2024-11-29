const express = require("express");
const studentsController = require("../controllers/Students.js")
const Router = express.Router();

Router.get("/", studentsController.getStudents);
Router.post("/add", studentsController.add);
Router.put("/update", studentsController.update);
Router.delete("/delete", studentsController.delete);

module.exports = Router
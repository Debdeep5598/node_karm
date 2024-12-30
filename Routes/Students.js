const express = require("express");
const studentsController = require("../controllers/Students.js")
const Router = express.Router();

const test = (req, res, next)=>{

}

Router.get("/", studentsController.getStudents);
Router.get("/all", studentsController.getAll);
Router.get("/:id", studentsController.getById);

Router.post("/add", studentsController.add);
Router.post("/add-student", studentsController.addStudent);


Router.put("/update", studentsController.update);
Router.put("/update-student", studentsController.updateStudent);


Router.delete("/delete", studentsController.delete);
Router.delete("/delete-student", studentsController.deleteStudent);

module.exports = Router
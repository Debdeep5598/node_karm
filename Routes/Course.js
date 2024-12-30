const courseController = require("../controllers/Course");

const express = require("express");

const Router = express.Router();
Router.get("/", courseController.getCourse);
Router.post("/add", courseController.addCourse)

module.exports = Router

const express = require("express");
const teachersController = require("../controllers/Teachers.js")

const Router = express.Router();


Router.get("/", teachersController.getteachers)

module.exports = Router


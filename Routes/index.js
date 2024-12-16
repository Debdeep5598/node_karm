const express = require("express");
const studentsRoutes = require("./Students");
const teachersRoutes = require("./Teachers");

const router = express.Router();

router.use("/students", studentsRoutes);
router.use("/teachers", teachersRoutes);

module.exports = router;

const express = require("express");
const studentsRoutes = require("./Students");
const teachersRoutes = require("./Teachers");
const courseRoutes = require("./Course");

const router = express.Router();

router.use("/students", studentsRoutes);
router.use("/teachers", teachersRoutes);

router.use("/course", courseRoutes);

module.exports = router;

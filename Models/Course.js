const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true, 
  },
  date: {
    type: Date,
    default: Date.now,
  },
});





const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;

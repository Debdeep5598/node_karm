
const Course=require("../Models/Course");


exports.getCourse = async (req, res)=>{
  try {
    const courses = await Course.find();
    res.status(200).json({
      message: "All courses!",
      courses
    })
    
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}

exports.addCourse = async (req, res) => {
  const { name} = req.body;

  try {
    const newCourse = new Course({ name});
    const result = await newCourse.save();

    res.status(201).json({
      message: "Course added successfully!",
      result,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0]; 
      res.status(400).json({
        message: `Duplicate value for ${field}: "${error.keyValue[field]}". Please use a unique ${field}.`,
      });
    } else {
      res.status(500).json({
        message: error.message,
      });
    }
  }
};









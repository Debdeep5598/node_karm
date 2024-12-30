const fs = require("fs");
const Student = require("../Models/Students");
//var path = require('path');

//var directories = path.dirname('../data/');
//console.log(directories, "parent path");0

exports.getStudents = (req, res) => {
  let studentsJsonFile = "./data/students.json";
  let students = fs.readFileSync(studentsJsonFile, "utf8");

  console.log(students, "testtt");

  if (students != "") {
    students = JSON.parse(students);
  } else {
    students = [];
  }

  res.json(students);
};


exports.getAll = async (req, res)=>{
  try {
    const students = await Student.find().populate("course");
    res.status(200).json({
      message: "Student Add Successfully!",
      students
    })
    
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}



exports.addStudent = async (req, res) => {
  const { id, name, Dept, email, phone,course } = req.body;

  try {
    const newStudent = new Student({ id, name, Dept, email, phone, course });
    const result = await newStudent.save();

    res.status(201).json({
      message: "Student added successfully!",
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





exports.updateStudent = async (req, res) => {
  const { id, name, Dept, email, phone } = req.body;

  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { id }, 
      { name, Dept, email, phone }, 
      { new: true, runValidators: true, context: 'query' } 
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: `Student with ID ${id} not found!`,
      });
    }

    res.status(200).json({
      message: "Student updated successfully!",
      updatedStudent,
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






exports.deleteStudent = async (req, res) => {
  const { id } = req.body; 

  try {
    if (!id) {
      return res.status(400).json({
        message: "Student ID is required for deletion!",
      });
    }

    const deletedStudent = await Student.findOneAndDelete({ id });

    if (!deletedStudent) {
      return res.status(404).json({
        message: `Student with ID ${id} not found!`,
      });
    }

    res.status(200).json({
      message: "Student deleted successfully!",
      deletedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};





exports.getById = async(req, res)=>{

  const {id}= req.params
  console.log(id);

  const result = await Student.find({id})
  res
    .status(201)
    .json({ message: "Student details", result });
}




//add
exports.add = (req, res) => {
  let studentsJsonFile = "./data/students.json";
  let students = fs.readFileSync(studentsJsonFile, "utf8");
  console.log(students.length, "length");
  if (students.length == 0) {
    students = [];
  } else {
    students = JSON.parse(students);
  }
  const { id, name, Dept } = req.body;

  // Validate input
  if (!id || !name || !Dept) {
    return res
      .status(400)
      .json({ error: "All fields (id, name, Dept) are required!" });
  }

  const newStudent = { id, name, Dept };

  // Add the new student to the array
  students.push(newStudent);

  students = JSON.stringify(students);
  fs.writeFileSync(studentsJsonFile, students);

  res
    .status(201)
    .json({ message: "Student added successfully", student: newStudent });
};





//update
exports.update = (req, res) => {
  let studentsJsonFile = "./data/students.json";

  let students = fs.readFileSync(studentsJsonFile, "utf8");

  if (students.length === 0) {
    return res.status(404).json({ error: "No students found to update!" });
  } else {
    students = JSON.parse(students);
  }

  const { id, name, Dept } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ error: "Student ID is required for updating!" });
  }

  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ error: `Student with ID ${id} not found!` });
  }

  if (name) students[studentIndex].name = name;
  if (Dept) students[studentIndex].Dept = Dept;

  fs.writeFileSync(studentsJsonFile, JSON.stringify(students));

  res.status(200).json({
    message: "Student updated successfully",
    student: students[studentIndex],
  });
};












//delete
exports.delete = (req, res) => {
  let studentsJsonFile = "./data/students.json";
  let students = fs.readFileSync(studentsJsonFile, "utf8");

  students = JSON.parse(students);
  const { id } = req.body;

  // Validate input
  if (!id) {
    return res
      .status(400)
      .json({ error: "Student ID is required for deletion!" });
  }

  newStudents = students.filter((student)=>{

    if(id != student.id)
    return student
  } )

  console.log("Students after delete : ", newStudents);

  students = JSON.stringify(newStudents);
  fs.writeFileSync(studentsJsonFile, students);

  res.status(200).json({
    message: "Student deleted successfully",
    newStudents // Return the deleted student
  });
};

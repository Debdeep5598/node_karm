const fs = require("fs");
//var path = require('path');

//var directories = path.dirname('../data/');
//console.log(directories, "parent path");

// Define the students array at the top of the file
let students = [
  {
    id: 1,
    name: "Sam",
    Dept: "CS",
  },
  {
    id: 2,
    name: "Akib",
    Dept: "MCS",
  },
  {
    id: 3,
    name: "John",
    Dept: "BCA",
  },
];

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
  const { id, name, Dept } = req.body;

  // Validate input
  if (!id) {
    return res
      .status(400)
      .json({ error: "Student ID is required for updating!" });
  }

  // Find the student by ID
  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ error: `Student with ID ${id} not found!` });
  }

  // Update the student's details
  if (name) students[studentIndex].name = name;
  if (Dept) students[studentIndex].Dept = Dept;

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

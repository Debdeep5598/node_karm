const express = require("express");
const bodyParser = require("body-parser")

const StudentsRoutes = require("./Routes/Students")
const TeachersRoutes = require("./Routes/Teachers");
const app = express()

const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get("/", (req, res)=>{
    res.send("welcome come to nodeExpress");
})

app.use("/students", StudentsRoutes)
app.use("/teachers", TeachersRoutes)

app.listen(port, (err)=>{
    console.log(`Server runing on port ${port}`)

})
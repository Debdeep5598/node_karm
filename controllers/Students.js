exports.getStudents = (req, res)=>{
    let students = [
        {
            "id": 1,
            "name": "Sam",
            "Dept" : "CS"
        },
        {
            "id": 2,
            "name": "Akib",
            "Dept" : "MCS"
        },

        {
            "id": 3,
            "name": "John",
            "Dept" : "BCA"
        }

    ]
    res.json(students);

}

exports.add = ()=>{

}

exports.update = ()=>{
    
}

exports.delete = ()=>{
    
}
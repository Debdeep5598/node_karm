const http = require("http");

const url = require("url");

const fs = require("fs");

const customModule = require("./customModule.js");

//customModule.sayHi();
///customModule.gretting();

// http://localhost:3000/
//http://localhost:3000/about

// http://localhost:3000/student?id=1



const server = http.createServer((req, res)=>{

   
    //console.log(req.url);
    const ParseUrl = url.parse(req.url, true);
    //console.log(ParseUrl);

    res.writeHead(200, { 'Content-Type': 'text/html' });

    let filepath = '';
    if (req.method === "POST") {
        let todosJsonFile = "data.json";
        let todos = fs.readFileSync(todosJsonFile, "utf8");
        console.log(todos.length, "length");
        if(todos.length == 0){
            todos = [];
        }else{
            todos = JSON.parse(todos);
        }
    
        let body = '';  
        req.on("data", (chunk) => {
            body += chunk;
            todos.push(body)
            console.log(todos)
            todos = JSON.stringify(todos);
            fs.writeFileSync(todosJsonFile, todos);
            
            res.end(todos)
        });

        




       
    } else if(ParseUrl.pathname == "/"){
        filepath = "index.html"
    }else{
        filepath = ParseUrl.pathname.replace("/", "")+".html"; // about.html, contact.html
    }
    
   if(fs.existsSync(filepath)){
        fs.readFile(filepath, function(err, data){
            //console.log(data);
            res.end(data);
        })
    }else{
        res.end("Page not found!");
    } 
    
    
})

server.listen(3000, ()=>{
    console.log("server is running on port 3000")
})
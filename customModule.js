const customModule2 = require("./customModule2");

exports.sayHi = ()=>{
    console.log('Hi!');
}

exports.gretting = ()=>{
    //const content = customModule2.grettingContent()
    const content = customModule2.abc
    console.log(content)
}
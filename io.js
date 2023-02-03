const fs = require("fs");

fs.writeFile("text.text", "This is my cat", () => {
    console.log("Finished writing file")
}); 

fs.writeFileSync("hello.text", "Hello world");
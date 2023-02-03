const fs = require("fs");
const http = require("http");

/*const date = new Date();

const userData = [
  {
    userName: "user1",
    email: "user1@gmail.com",
    password: "222222",
    id: "1",
    createdAt: `${date.toLocaleDateString()} : ${date.toLocaleTimeString()}`,
    updateAt: `${date.toLocaleDateString()} : ${date.toLocaleTimeString()}`,
  },
 
  
];*/

const server = http.createServer((req, res) => {
 /* if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-type": "text/css" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-type": "text/javascript" });
      res.write(data);
      return res.end();
    });
  }  else if (req.url === "/userData") {
    const method = req.method;
    if (method === "GET") {
      console.log("GET")
      res.writeHead(200, { "Content-type": "application/json" });
      res.write(JSON.stringify(userData));
      return res.end();
    } else if (method === "POST") {
      console.log("POST")
      let newData = "";
      req.on("data", (chunk) => {
        newData += chunk;
      });
      req.on("end", () => {
        const newUsersData = JSON.parse(newData);
        userData.push(newUsersData);
        // console.log(userData);
        res.writeHead(200, { "Content-type": "application/json" });
        res.write(JSON.stringify(userData));
        res.end();
      });
      
    } else if (method === "PUT") {
      console.log("PUT")
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const newDatas = JSON.parse(data);
        const FoundUser = userData.find(user => user.email === newDatas.email);

        const newName = newDatas.userName;
        // console.log(newName);

        if(FoundUser) {
          FoundUser.userName = newName;
          FoundUser.password = newDatas.password;
          const newDate = new Date();
          FoundUser.updateAt = `${newDate.toLocaleDateString()} : ${newDate.toLocaleTimeString()}`
          // console.log(FoundUser);
          res.writeHead(200, { "Content-type": "application/json" });
          res.write(JSON.stringify(userData));
        }
       
        res.end();
      });
    } else if (method === "DELETE") {
      console.log("DELETE")
      let Data = "";
      req.on("data", (chunk) => {
        Data += chunk;
      });
      req.on("end", () => {
        const newUpdateDatas = JSON.parse(Data);
        const isEmailexit = userData.find(user => user.email === newUpdateDatas.email);
        if (isEmailexit) {
          const indexofuser = userData.indexOf(isEmailexit);
          userData.splice(indexofuser, 1);
          // console.log(userData.splice(indexofuser, 1));
        }
        res.writeHead(200, { "Content-type": "application/json" });
        res.write(JSON.stringify(userData));
        res.end();
      });
    } else {
      res.end();
    }
  }else*/ if(req.url === "/fileUpload"){
    let data = "";
    req.on("data", (chunk) => {
        data += chunk;
    });
    req.on("end", () => {
        
        fs.writeFileSync("text.text", JSON.parse(data).hello)
        res.writeHead(200, {"Content-type": "application/json"});
        res.write(JSON.stringify({message: "success"}));
       return res.end();
    })

    // const writeStream = fs.createWriteStream("img.png");
    // req.pipe(writeStream);
    // res.writeHead(200, {"Content-type": "application/json"});
    // res.write(JSON.stringify({message: "Upload success"}));
    // return res.end();
    // ===========OR================
    const fileType = req.headers['content-type'].split("/")[1];
    const writeStream = fs.createWriteStream(`file.${fileType}`);
    req.pipe(writeStream);
    res.writeHead(200, {"Content-type": "application/json"});
     res.write(JSON.stringify({message: "Upload success"}));
     return res.end();
  } else {
    res.writeHead(500, { "Content-type": "text/plain" });
    res.write("404 pages are not found");
    return res.end();
  }
});
server.listen(3000, () => {
  console.log("Server started: Listening on port 3000");
});

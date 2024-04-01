const express = require("express");
const fs = require('fs');
// const path=require('path');
// const sharp=require('sharp');
// const sass=require('sass');
// const ejs=require('ejs');


app = express();
console.log("Folder proiect", __dirname);
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd());

app.set("view engine", "ejs");

app.use("/resurse", express.static(__dirname + "/resurse"));
// process.cwd()-folderul de unde rulam 
// dirname-folderul unde se ruleaza codul

app.get("/cerere", function (req, res) {
    res.send("<b>Hello</b> <span style='color=red>world</span");
})
app.get("/data", function (req, res, next) {
    res.write("data:");
    next();
})
app.get("/data", function (req, res) {
    res.write("" + new Date());
    res.end();
})


app.get("/suma/:a/:b", function (req, res) {
    var suma = parseInt(req.params.a) + parseInt(req.params.b)
    res.send("" + suma);
});


app.get("/", function (req, res) {
    // res.sendFile(__dirname + "/index.html")
    res.render("pagini/index");
})

app.get(["/", "/index", "/home"], function (req, res) {
    // res.sendFile(__dirname + "/index.html")
    res.render("pagini/index");
})

app.get("/*", function (req, res) {
    // res.send(req.url);
    console.log(req.url);
    res.render("pagini/eroare");
    res.render("pagini" + req.url, function (err, rezHtml) {
        console.log("Pagina: ", rezHtml);
        console.log("Eroare: ", err);
        res.send(rezHtml)

    })
});
// rezHtml continutul paginii html











app.listen(8080);
console.log("Serverul a pornit");
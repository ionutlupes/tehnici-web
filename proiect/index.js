const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();
// const path=require('path');
// const sharp=require('sharp');
// const sass=require('sass');
// const ejs=require('ejs');

console.log("Folder proiect", __dirname);
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd());

app.set("view engine", "ejs");

app.use("/resurse", express.static(__dirname + "/resurse"));

// process.cwd()-folderul de unde rulam 
// dirname-folderul unde se ruleaza codul


vect_foldere = ["temp", "temp1"]

for (let folder of vect_foldere) {
    let caleFolder = path.join(__dirname, folder)
    if (!fs.existsSync(caleFolder)) {
        fs.mkdirSync(caleFolder)
    }
}
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

app.get(["/", "/home", "/index"], function (req, res) {
    res.render("pagini/index", {
        ip: req.ip
    });

})



app.get("/suma/:a/:b", function (req, res) {
    var suma = parseInt(req.params.a) + parseInt(req.params.b)
    res.send("" + suma);
});


app.get("/", function (req, res) {

    // res.sendFile(__dirname + "/index.html")
    res.render("pagini/index");
})

app.get("/about", function (req, res) {

    // res.sendFile(__dirname + "/index.html")
    res.render("pagini/about");
})




app.get("/favicon.ico", function (req, res) {
    res.sendFile(path.join(__dirname, "resurse/favicon/favicon.ico"));
});

obGlobal = {
    obErori: null
}


function initErori() {
    var continut = fs.readFileSync(path.join(__dirname, "resurse/json/erori.json")).toString("utf-8");
    obGlobal.obErori = JSON.parse(continut);
    for (let eroare of obGlobal.obErori.info_erori) {
        eroare.imagine = path.join(obGlobal.obErori.cale_baza, eroare.imagine)
    }
    console.log(obGlobal.obErori);
    obGlobal.obErori.eroare_default.imagine = path.join(obGlobal.obErori.cale_baza, obGlobal.obErori.eroare_default.imagine)

}
initErori();
app.get("/*.ejs", function (req, res) {
    return afisareEroare(res, 400);
});

app.get(new RegExp("^\/[\/a-z0-9A-Z]*\/$"), function (req, res) {
    return afisareEroare(res, 403);
});
app.get("/*", function (req, res) {
    try {
        console.log(req.url);


        res.render("pagini" + req.url, function (err, rezHtml) {
            if (err) {
                console.error("Rendering error:", err);

                if (err.message.startsWith("Failed to lookup view")) {
                    return afisareEroare(res, 404);
                } else {

                    return afisareEroare(res);
                }
            }


            console.log("Rendered page:", rezHtml);
            res.send(rezHtml);
        });
    } catch (err1) {
        console.error("Error:", err1);
        return afisareEroare(res);
    }
});


function afisareEroare(res, _identificator, _titlu, _text, _imagine) {
    let eroare = obGlobal.obErori.info_erori.find(elem => elem.identificator == _identificator);

    if (!eroare) {
        let eroare_default = obGlobal.obErori.eroare_default;
        return res.render("pagini/eroare", {
            titlu: _titlu || eroare_default.titlu,
            imagine: _imagine || eroare_default.imagine,
            text: _text || eroare_default.text,
        });
    } else {
        if (eroare.status) {
            res.status(eroare.identificator);
        }
        return res.render("pagini/eroare", {
            titlu: _titlu || eroare.titlu,
            text: _text || eroare.text,
            imagine: _imagine || eroare.imagine,
        });
    }
}





app.listen(8080);
console.log("Serverul a pornit");
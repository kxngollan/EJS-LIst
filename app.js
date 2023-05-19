const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = __dirname + "/views/lists.ejs";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

let listItems = [];

app.get("/", (req, res)=>{
    const today = new Date();

    const formattedDate = today.toLocaleString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    res.render("lists", { kindOfDay: formattedDate, listItems: listItems });
});

app.post("/", (req,res)=>{
let item = req.body.listItem;
listItems.push(item);
res.redirect("/");
});

app.post("/delete", (req, res) => {
    const index = req.body.index;
    listItems.splice(index, 1);
    res.redirect("/");
  });


app.listen(3000, ()=>{
    console.log("This is running on Server 3000");
});
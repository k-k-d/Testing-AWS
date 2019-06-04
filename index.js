const express = require("express");
// const cookie = require("cookie");
const cookieparser = require("cookie-parser");
const session = require("express-session");

app = express();

app.use(cookieparser());

app.set("trust proxy", 1);
app.use(session({
    secret: "IITKCSESOC2019",
    saveUninitialized: false,
    resave: false,
    cookies : {secure: true}
}));

app.get("/", function(req, res, next){res.send("Hello. This is Server!");});

app.get("/showcookie", function(req, res, next){res.send(JSON.stringify(req.cookies));});

app.get("/setcookie", function(req, res, next){
    res.cookie("Username", "fakeuser");
    res.cookie("magic", Math.floor(Math.random()*1000));
    res.send("Done!");
});

app.get("/counter", function(req, res, next){
    // console.log(req.session);
    var username;
    if(req.session.username)
        username = req.session.username;
    else
        username = "Guest";
    if(req.session.count){
        req.session.count++;
        res.send(username + ", You have visited " + req.session.count + " times");
    } else {
        req.session.count = 1;
        res.send(username + ", Initialized a session for you.");
    }
    // req.session.save();
});

app.get("/auth", function(req, res, next){
    var username = req.query.username;
    var password = req.query.password;
    if(username === "kkd" && password === "fuckspyder"){
        req.session.username = username;
        req.session.magic = "" + Math.floor(Math.random()*1000) + password;
        res.send("Successfully Authenticated!!");
    }
    else{
        res.send("Authentication Failed!!!");
    }
});

app.get("/logout", function(req, res, next){
    req.session.destroy();
    res.send("Successfully Logged Out!!");
});

app.listen(3000);
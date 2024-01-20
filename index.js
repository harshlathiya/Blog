const express = require('express');
const port = 8001;
const app = express();
const path = require('path');
const mongoose = require('mongoose')
//const db = require("./config/mongoose");


mongoose.connect(("mongodb+srv://harsh91:harsh91@cluster0.qpf7hje.mongodb.net/adminPanal1"), {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));
const Admin = require("./models/admin");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


// cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded());
const session = require('express-session');

const passport = require('passport');
const passportlocal = require('./config/passport-local');

app.use(session({
      name : "harsh",
      secret : "harsh",
      resave : false,
      saveUninitialized: true,
       cookie : {
           maxAge : 1000*60*100
       }
}))

app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuth);
// routing
app.use('/',require('./routes/user'));
app.use("/admin",require("./routes/admin"));
app.use(express.static(path.join(__dirname,"assets")));
app.use(express.static(path.join(__dirname,"user_assets")));
app.use("/uploades",express.static(path.join(__dirname,"uploades")));


app.listen(port,function(err){
    if(err)
    console.log(err);

    console.log(`Server is running port :${port}`);
})
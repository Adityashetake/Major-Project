
if(process.env.NODE_ENV != "production"){

require('dotenv').config();

}
// console.log(` ${process.env.SECRET}`)

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
engine = require('ejs-mate');
const wrapAsync = require("./utils/wrapasync.js")
const ExpressError = require("./utils/ExpressError");
const listings = require("./routes/listings.js");
const Review = require("./models/review.js");
const cookieParser= require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratgy = require("passport-local").Strategy;
const User = require("./models/user.js");

const listingRouter = require("./routes/listings.js")
const reviewRouter = require("./routes/review.js");

const userRouter = require("./routes/user.js");
const {listingSchema,reviewSchema} = require("./Schema.js");
const session = require("express-session");
const cookie= require("cookie");



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=> {
    console.log("connected to DB");
})
.catch((err) => {
console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));
app.engine('ejs', engine);
app.engine('ejs', require('ejs-mate'));

app.use(express.static(path.join(__dirname,"/public")));

// app.get("/",(req,res)=> {
//     res.send("Hi i am groot");
    
// });
const sessionOption={
    secret:"mySecret@123",
    resave:false,
    saveUninitialized:true,

    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true

    },
};
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratgy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("Success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/demouser",async(req,res)=>{
    let fakeUser = new User({
        email:"studentemail.com",
        username:"rahul-student"
    });

   let registeredUser = await User.register(fakeUser, "helloworld");
res.send(registeredUser);
})



app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter);

app.use(cookieParser());

app.get("/getsignedcookies",(req,res)=>{
    res.cookie("made in india",{signed:true});
    res.send("signed cookies");
})

app.get("/verify",(req,res)=>{
    console.log(req.signedcookies);
    res.send("verified");
})


app.all(/.*/,(req,res,next) => {     // default error handling for all requests
    next(new ExpressError(404,"page not found"));
    // res.redirect(" ")
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error", { err });
});


app.listen(8080, () => {console.log("app is listening to port 8080")}

);
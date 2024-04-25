const express=require("express");
const path=require("path");
const {connectDb}=require("./connections");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRoute");
const userRoute=require("./routes/user")

const {handleRestrictToLoggedinUserOnly,checkAuth}=require("./middlewares/auth");

const app=express();
const URL=require("./models/url");

const PORT=process.env.PORT||8001;

//set connection
//connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("Mongodb Connected!"));
//const MONGO_URL = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6";//
connectDb();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

//routes
app.use("/user",userRoute);
app.use("/",checkAuth,staticRoute);
app.use("/url",handleRestrictToLoggedinUserOnly,urlRoute);
app.delete("/:id",async(req,res)=>{
    await URL.findByIdAndDelete(req.params.id);
    return res.json("Deleted!");
});
app.get("/url/:id",async(req,res)=>{
    const shortId=req.params.id;
    const entry=await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory:{
                    timeStamps:Date.now(),
                },
            },
        }
    );
    return res.redirect(entry.redirectUrl);
});

app.listen(PORT,()=>console.log(`Server started at port: ${PORT}`));

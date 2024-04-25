const mongoose=require("mongoose");

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb Connected with ${mongoose.connection.host}`)
    } 
    catch(error) {
        console.log(`Mongodb database error ${error}`)
    }
}

module.exports={
    connectDb,
}

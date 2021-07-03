import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config({ path: "Config.env" });

mongoose.connect(process.env.DB_URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
},(err)=>{
    if(err){
        console.log("There is an Error!",err.message)
    }else{
        console.log("DB is Connected!")
    }
})
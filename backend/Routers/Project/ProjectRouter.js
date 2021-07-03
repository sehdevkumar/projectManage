import express from 'express'
import dotenv from "dotenv";
dotenv.config({ path: "Config.env" });


const ProjectRouter = express.Router()

ProjectRouter.post('/api/createproject/',(req,res)=>{
    
})



export default ProjectRouter




import express from 'express'
import dotenv from "dotenv";
dotenv.config({ path: "Config.env" });
import authControl from '../authControl.js';
import Project from '../../Models/projects.js'
import User from '../../Models/authUser.js'
import Tasks from '../../Models/tasks.js';
import mongoose from 'mongoose'

const ProjectRouter = express.Router()


ProjectRouter.post('/api/createproject/',authControl,async (req,res)=>{
     const adminID = req.admin;
     const name = req.body.name
    try {
        await Project.create({
           name,
           createdBy:adminID
        })
        res.status(201).json({message:"Successfully Created"})

    } catch (error) {   
        return res.status(500).json({error:"Internal Error"})
    }

})

ProjectRouter.get('/api/projects/',authControl,async(req,res)=>{

        try {
            
            const data = await Project.find()
            res.status(200).json({projects:data})
        } catch (error) {
             return res.status(500).json({ error: "Internal Error" });
        }

})

ProjectRouter.get("/api/developers/", authControl, async (req, res) => {
  try {
    const data = await User.find({role:"developer"});
    res.status(200).json({ developers: data });
  } catch (error) {
    return res.status(500).json({ error: "Internal Error" });
  }
});

ProjectRouter.post("/api/createtask", authControl, async (req, res) => {
     const adminID = req.admin;
     const {task,projectID,assignTO} = req.body
     try {
        
      const check = await Tasks.create({
        task,
        projectID,
        assignedTO:assignTO,
        createdBy: adminID,
      });
       if(check)
         res.status(200).json({message:"Successfully Added"})
        else
         res.status(400).json({ error: "FAILED!" });


     } catch (error) {
       console.log(error.message)
        res.status(500).json({error:"Internal Error!"})
     }


});


ProjectRouter.get("/api/tasks/", authControl, async (req, res) => {
  const adminID = req.admin;
  try {
    
    const data = await Tasks.find({ createdBy:adminID });
    res.status(200).json({ tasks: data });

  } catch (error) {
    return res.status(500).json({ error: "Internal Error" });
  }
});

ProjectRouter.delete("/api/task/delete/:id", authControl, async (req, res) => {
      try {
        
      
        const tid = mongoose.Types.ObjectId(req.params.id);
        
        await Tasks.findByIdAndDelete(tid,(err)=>{
            if(err){
              return res.status(400).json({error:err.message})
            }else{

              res.status(200).json({message:"SuccessFully Deleted!"})
            }
        })

      } 
      catch (error) {
       
          res.status(500).json({error:"Server Error!"})
      }
});

export default ProjectRouter




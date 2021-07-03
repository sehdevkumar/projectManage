import express from 'express'
import User from '../../Models/authUser.js'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from "dotenv";
dotenv.config({ path: "Config.env" });

const RegisterRouter = express.Router()

RegisterRouter.post('/api/register',async (req,res)=>{
    
    const {name,email,password,role} = req.body
    try {
        
        const exists = await User.findOne({email})
        if(exists){
            return res.status(409).json({error:'Account Already Exists!'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt)

        const user = await User.create({
            name,
            email,
            password:hashPass,
            role
        })

        if(user){
            
            const token = jsonwebtoken.sign({id:user._id},process.env.TOKENSECRET,{
                expiresIn:'60d'
            })
        

            res.status(201).json({
              user: {
                name: user.name,
                token: token,
                role: user.role,
              },
            });

        }else{
                res
               .status(404)
               .json({ error: "User Not Created"});
        }


        


    } catch (error) {
         return res.status(500).json({ error: "Internal Error!" });
    }


})

export default RegisterRouter;
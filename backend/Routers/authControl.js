import jsonwebtoken from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config({ path: "Config.env" });

const authControl = async (req,res,next)=>{
    try {
          const token = req.headers.authorization.split(' ')[1].replace(' ','');
          const check = await jsonwebtoken.verify(
            token,
            process.env.TOKENSECRET
          );
          if(!check){
              return res.status(404).status({error:"Access Not Allow"})
          }else{
            req.admin=check.id
            next();
          }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:'Server Error'})
    }
  
}

export default authControl
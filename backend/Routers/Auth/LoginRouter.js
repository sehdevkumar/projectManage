import express from "express";
import User from "../../Models/authUser.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config({ path: "Config.env" });

const RegisterRouter = express.Router();

RegisterRouter.post("/api/login", async (req, res) => {
  const {  email, password, role } = req.body;
  try {
    const exists = await User.findOne({ email,role });
    if (!exists) {
      return res.status(404).json({ error: "Invalid Credential!" });
    }

    if(!await bcrypt.compare(password,exists.password)){
         return res.status(404).json({ error: "Invalid Credential!" });
    }

  
      const token = jsonwebtoken.sign(
        { id:exists._id },
        process.env.TOKENSECRET,
        {
          expiresIn: "60d",
        }
      );

      res.status(201).json({
        user: {
          name: exists.name,
          token: token,
          role: exists.role,
        },
      });
  } 
  catch (error) {
    return res.status(500).json({ error: "Internal Error!"});
  }
});

export default RegisterRouter;

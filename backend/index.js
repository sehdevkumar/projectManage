import express from 'express'
import dotenv  from 'dotenv'
dotenv.config({path:"Config.env"})
import cors from 'cors'
import RegisterRouter from './Routers/Auth/RegisterRouter.js'
import LoginRouter from './Routers/Auth/LoginRouter.js'
import './DB/db.js'
import ProjectRouter from './Routers/Project/ProjectRouter.js'


const app  = express()
app.use(express.json())
app.use(cors())
app.use(RegisterRouter)
app.use(LoginRouter)
app.use(ProjectRouter)




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT} `)
})


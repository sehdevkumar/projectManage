import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const Project = mongoose.model('PROJECTS',projectSchema);

export default Project
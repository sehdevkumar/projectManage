import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  projectID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  assignedTO: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    default: "No Status yet",
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  modifiedDate: {
    type: Date,
    required: false
  },
});

const Tasks = mongoose.model('TASKS',taskSchema)

export default Tasks


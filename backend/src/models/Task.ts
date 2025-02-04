import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false }, // Ensure completed field exists
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;

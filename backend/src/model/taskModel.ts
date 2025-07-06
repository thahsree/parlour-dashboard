import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    task: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

export const Task = mongoose.model("Task", taskSchema);

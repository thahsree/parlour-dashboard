import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["in", "out"],
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

export const Attendance = mongoose.model("Attendance", attendanceSchema);

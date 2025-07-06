import mongoose from "mongoose";


const employeeModel = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true

        },
        role:{
            type:String,
            required:true
        },
        contactNumber:{
            type:Number,
            required:true
        }
    },
    {
        timestamps:true
    }
)
export const Employee = mongoose.model('Employee',employeeModel);


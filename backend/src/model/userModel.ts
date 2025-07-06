import mongoose from "mongoose";


const userModel = new mongoose.Schema(
    {
        username:{
            type:String
        },
        email:{
            type:String
        },
        password:{
            type:String
        },
        role:{
            type:Number,
            enum:[5555,4444],
            default:4444
        }
    },
    {
        timestamps:true
    }
)
export const User = mongoose.model('User',userModel);


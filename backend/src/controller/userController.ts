import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import AsyncHandler from '../middleware/AsyncHandler';
import { User } from '../model/userModel';

export const getUser = AsyncHandler(async (req: Request, res: Response) => {
  res.send('User route working!');
});

export const createUser = AsyncHandler(async (req:Request , res:Response) => {

    const {username , password , email , role} = req.body

    if(!username || !password || !email || !role){
        return res.status(404).json({"message":"username or password or email or role not found"});
    }

    const userExist = await User.findOne({email})

    if(userExist){
        return res.status(404).json({"message":"user already exists"});
    }
    const hashedPass = await bcrypt.hash(password,10);

    const data =await User.create({
        username,
        email,
        password : hashedPass,
        role
    })

    return res.status(200).json(data);
})

export const editUser = AsyncHandler(async(req:Request ,res:Response)=>{

    const id = req.params.id;
    const {username , email , password , role} = req.body

    const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        ...(username && { username }),
        ...(email && { email }),
        ...(password && { password }),
        ...(role && { role }),
      },
    },
    { new: true } // returns the updated document
  )

  if(!updatedUser){
    return res.status(404).json({"message":"User not found"});
  }

  return res.status(200).json(updatedUser)
})
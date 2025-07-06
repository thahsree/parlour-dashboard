import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AsyncHandler from '../middleware/AsyncHandler';
import { User } from '../model/userModel';

export const getUser = AsyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();

  if (users.length < 1) {
    return res.status(404).json({ message: 'No users found' });
  }

  return res.status(200).json(users);
});

export const createUser = AsyncHandler(async (req: Request, res: Response) => {
  const { username, password, email, role } = req.body;

  if (!username || !password || !email || !role) {
    return res.status(400).json({ message: 'Username, password, email, or role is missing' });
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username, 
    email,
    password: hashedPass,
    role,
  });

  return res.status(201).json(newUser);
});

export const editUser = AsyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { username, email, password, role } = req.body;

  const updateFields: any = {};

  if (username) updateFields.username = username;
  if (email) updateFields.email = email;
  if (role) updateFields.role = role;
  if (password) {
    updateFields.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(updatedUser);
});

export const deleteUser = AsyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id; 

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(404).json({ message: 'User ID not found' });
  }

  return res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
});

export const login = AsyncHandler(async(req:Request, res:Response)=>{
  const { email, password } = req.body;


    // 1. Check if user exists
    let user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 2. Compare password with hashed one in DB
    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Generate JWT
    const token = jwt.sign({ userId: user._id , role:user.role }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });


    const userObj = user.toObject()
    delete userObj.password
    res.status(200).json({ success: true, user:userObj , token});
})

export const logout = AsyncHandler(async(req:Request , res:Response) =>{

  const cookie = serialize('token','',{
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    sameSite: 'none',
    path:'/',
    maxAge:0
  })

  res.setHeader('Set-Cookie',cookie);
  res.status(200).json({"message":"logout successful"});
})
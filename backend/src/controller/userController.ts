import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
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

import { Request, Response } from "express";
import AsyncHandler from "../middleware/AsyncHandler";
import { Employee } from "../model/employeeModel";

export const createEmployee = AsyncHandler(async(req:Request , res:Response)=>{

    const {name , contactNumber , role } = req.body;

    if(!name || !contactNumber || !role ){
        return res.status(404).json({"message":"employee name , contact number , role are required"});
    }

    const response = await Employee.create({
        name,
        contactNumber,
        role
    })  

    return res.status(200).json(response);
})


export const getEmployees = AsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id) {
    const user = await Employee.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  }

  const users = await Employee.find();

  if (!users.length) {
    return res.status(404).json({ message: 'No users found' });
  }

  return res.status(200).json(users);
});


export const updateEmployee = AsyncHandler(async(req:Request , res:Response)=>{

    const id = req.params.id;
      const { name, role, contactNumber } = req.body;
    
      const updateFields: any = {};
    
      if (name) updateFields.name = name;
      if (contactNumber) updateFields.contactNumber = contactNumber;
      if (role) updateFields.role = role;
      
    
      const updatedEmployee = await Employee.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
    
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
    
      return res.status(200).json(updatedEmployee);

})


export  const deleteEmployee = AsyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id; 

  const deletedEmployee = await Employee.findByIdAndDelete(id);

  if (!deletedEmployee) {
    return res.status(404).json({ message: 'Employee ID not found' });
  }

  return res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
});

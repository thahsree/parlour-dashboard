import { Request, Response } from "express";
import AsyncHandler from "../middleware/AsyncHandler";
import { Task } from "../model/taskModel";

export const createTask = AsyncHandler(async(req:Request,res:Response)=>{

    const {employeeId , task , dueDate } = req.body

    if(!employeeId || !task || !dueDate){
        return res.status(404).json({"message":"employeeid or task detail or duedate are missing"});
    }

    const response = await Task.create({
        employeeId,
        task,
        dueDate
    })

    return res.status(200).json(response);
})

export const getTasks = AsyncHandler(async(req , res )=>{

    const response = await Task.find().populate('employeeId');


    return res.status(200).json(response)
})

export const updateTask = AsyncHandler(async(req:Request , res:Response) =>{

    const id = req.params.id

    const { task , dueDate , status} = req.body

    const updateFields : any = {}

    if (task) updateFields.task = task;
    if(dueDate) updateFields.dueDate = dueDate;
    if(status) updateFields.status = status;

    const updatedTask = await Task.findByIdAndUpdate(id, {$set : updateFields} , {new:true})

    if(!updatedTask){
        return res.status(404).json({"message":"Task Not Found"});
    }

    return res.status(200).json(updatedTask)
    

})

export const deleteTask = AsyncHandler(async(req:Request, res:Response) =>{

    const id = req.params.id;

    const deletedTask = await Task.findOneAndDelete({_id:id});

    if(!deletedTask){
        return res.status(404).json({"message":"task not found"})
    }
    return res.status(200).json(deleteTask);
})
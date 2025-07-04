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
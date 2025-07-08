import { Request, Response } from "express";
import AsyncHandler from "../middleware/AsyncHandler";
import { Attendance } from "../model/attendanceModel";



export const getAllAttendance = AsyncHandler(async(req:Request , res:Response)=>{

    const { employeeId, date } = req.query;
    console.log('reached attendance')

    const query: any = {};
    if (employeeId) query.employeeId = employeeId;

    if (date) { 
        const dayStart = new Date(date as string);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd = new Date(date as string);
        dayEnd.setHours(23, 59, 59, 999);

        query.timeStamp = { $gte: dayStart, $lte: dayEnd };
    
    }

    console.log(query , "Query")
    const attendance = await Attendance.find(query).populate("employeeId").sort({timeStamp:-1});

    if(!attendance){
        return res.status(404).json({"message":"No attendace list found as Query"});
    }

    return res.status(200).json(attendance);

})

export const addAttendance = AsyncHandler(async (req:Request,res:Response)=>{

    const {id , status} = req.body

    console.log(id ,">>>", status)
    if(!id || !status){
        return res.status(404).json({"message":"Employee Id and status required"})
    }

    if(!["in","out"].includes(status)){
        return res.status(404).json({"message":"status must be either IN or OUT"})
    }

    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    const latestEntry = await Attendance.findOne({
    employeeId: id,
    timeStamp: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ timeStamp: -1 });

    if (latestEntry && latestEntry.status === status) {
        return res.status(409).json({ message: `Already marked ${status}` });
    }

    const response = await Attendance.create({
        employeeId:id,
        status
    })

    return res.status(200).json(response);
})
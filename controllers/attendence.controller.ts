import type { Request, Response } from "express";
import type { Attendence } from "../interfaces/models.interface";
import { attendences } from "../models/attendence.model";

export const createAttendence = async (_: Request, res: Response) :Promise<Response<any, Record<string, any>>>=> {
    const { studentId, classId, markedBy }: Attendence = _.body
    try {
        const newAttendence: Attendence = {
            studentId,
            classId,
            markedBy
        }
        await (await attendences.create(newAttendence)).save()
        return res.status(201).json({msg:'Attendence marked successfully'})
    }
    //@ts-ignore
    catch (err: Error) {
        return res.status(500).json({ err: 'An error occurred while marking attendence.' })

    }
}

export const deleteAttendence = async(_: Request, res: Response) :Promise<Response<any, Record<string, any>>>=> {
    const {attendenceId}:{attendenceId:String} = _.body
    try {
        await attendences.findByIdAndDelete(attendenceId)
        return res.status(201).json({msg:'Attendence marked successfully'})
    }
    //@ts-ignore
    catch (err: Error) {
        return res.status(500).json({ err: 'An error occurred while deleting attendence.' })

    }
}

export const getAllAttedencesByClassId = async(_: Request, res: Response) :Promise<Response<any, Record<string, any>>>=> {
    const {classId}:Attendence = _.body
    try {
        const classesExist = await attendences.find({classId})
        return res.status(201).json(classesExist)
    }
    //@ts-ignore
    catch (err: Error) {
        return res.status(500).json({ err: 'An error occurred while fetching attendences belongs to class Id.' })

    }
}


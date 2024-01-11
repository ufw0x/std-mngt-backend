import type { Request, Response } from "express";
import type { Class } from "../interfaces/models.interface";
import { classes} from "../models/class.model";

export const createClass = async (_: Request, res: Response):Promise<Response<any, Record<string, any>>>=> {
    const { classGrade, className, weekDate, time }: Class = _.body
    try {
        const newClass: Class = { classGrade, className, weekDate, time }
        await (await classes.create(newClass)).save().catch((err:Error)=>{throw new Error(err.message)})
        return res.status(201).json({msg:"Class created succesfully!"})
    }
    //@ts-ignore
    catch (err: Error) {
        return res.status(400).json({ err: err.message })
    }
}

export const getAllClasses = async (_: Request, res: Response):Promise<Response<any, Record<string, any>>>=> {
    try {
       const classesExist = await classes.find({})
       return res.status(200).json(classesExist)
    }
    //@ts-ignore
    catch (err: Error) {
        return res.status(400).json({ err: err.message })
    }
}

export const getClassById = async (_: Request, res: Response):Promise<Response<any, Record<string, any>>>=> {
    const {classId}:{classId:String} = _.body
    try {
        const classExist = await classes.findById(classId)
        return res.status(200).json(classExist)
     }
     //@ts-ignore
     catch (err: Error) {
         return res.status(400).json({ err: err.message })
     }
}

export const deleteClass = async (_: Request, res: Response):Promise<Response<any, Record<string, any>>>=> {
    const {classId}:{classId:String} = _.body
    try {
        const classExist = await classes.findByIdAndDelete(classId).catch((err:Error)=>{throw new Error(err.message)})
        return res.status(200).json({msg:'Class deleted successfully!'})
     }
     //@ts-ignore
     catch (err: Error) {
         return res.status(400).json({ err: err.message })
     }
}

export const getClassByGrade = async (_: Request, res: Response):Promise<Response<any, Record<string, any>>>=> {
    const {classGrade}:Class = _.body
    try {
        const classExist = await classes.find({classGrade})
        return res.status(200).json(classExist)
     }
     //@ts-ignore
     catch (err: Error) {
         return res.status(400).json({ err: err.message })
     }
}

export const getClassByName = async (_: Request, res: Response):Promise<Response<any, Record<string, any>>>=> {
    const {className}:Class = _.body
    try {
        const classExist = await classes.find({className})
        return res.status(200).json(classExist)
     }
     //@ts-ignore
     catch (err: Error) {
         return res.status(400).json({ err: err.message })
     }
}
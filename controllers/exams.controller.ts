import { type Request, type Response } from "express";
import type { Exam } from "../interfaces/models.interface";
import { exams } from "../models/exams.model";
interface Ireq extends Request, Exam { }
const createExam: Function = async (_: Ireq, res: Response) => {
    const examData: Exam = {
        studentId: _.studentId,
        heldIn: _.heldIn,
        marks: _.marks,
        classId: _.classId,
        title: _.title
    }
    try {
        await (await exams.create(examData)).save().then(() => {
            return res.status(201).json({ ...examData })
        })
    }
    catch (err: Error | any) {
        return res.status(501).json({ error: err.message })
    }
}

const getAllExams = async (_: Request, res: Response) => {
    try {
        const Exam = await exams.find()
        return res.status(200).json(Exam)
    } catch (err: Error | any) {
        return res.status(501).json({ error: err.message })
    }
}

const getExamByStudent = async(_:Request, res: Response) => {
    try {
        //@ts-ignore
        const Exam = await exams.find({studentId:_.id})
        return res.status(200).json(Exam)
    } catch (err: Error | any) {
        return res.status(501).json({ error: err.message })
    }
}

const getExamById = async(_:Request, res: Response) => {
    try {
        //@ts-ignore
        const Exam = await exams.findById(_.id)
        return res.status(200).json(Exam)
    } catch (err: Error | any) {
        return res.status(501).json({ error: err.message })
    }
}

const deleteExam = async(_:Request, res:Response)=>{
    try {
        //@ts-ignore
        const Exam = await exams.findByIdAndDelete(_.id)
        return res.status(200).json(Exam)
    } catch (err: Error | any) {
        return res.status(501).json({ error: err.message })
    }
}

const getExamByClass = async(_:Request, res: Response) => {
    try {
        //@ts-ignore
        const Exam = await exams.find({classId:_.id})
        return res.status(200).json(Exam)
    } catch (err: Error | any) {
        return res.status(501).json({ error: err.message })
    }
}
import type { Request, Response } from "express";
import type { Student } from "../interfaces/models.interface";
import { students } from "../models/student.model";

interface IStudent extends Student { studentId: string }

export const createStudent = async (_: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { fullname, whatsapp, grade, stdId }: Student = _.body
    const newStudent = { fullname, whatsapp, grade, stdId }
    try {
        await (await students.create(newStudent)).save().catch((err: Error) => { throw new Error(err.message) });
        return res.status(201).json({ msg: 'Student created successfully' })
    }
    //@ts-ignore
    catch (err: Error) {
        return res.status(400).json({ err: err.message })
    }
}

export const findStudentById = async (_: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { studentId }: IStudent = _.body
    try {
        const student = await students.findById(studentId)
        if (student) {
            return res.status(200).json(student)
        }
        return res.status(404).json({ err: 'No student found with the provided ID.' });
    }
    //@ts-ignore
    catch (err: Error) {
        return res.status(500).json({ err: 'An error occurred while trying to fetch the student.' })
    }
}

export const findStudentByStdId = async (_: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { stdId }: Student = _.body
    try {
        const student = await students.findOne({stdId})
        if (student) {
            return res.status(200).json(student)
        }
        return res.status(404).json({ err: 'No student found with the provided stdId.' });
    }
    //@ts-ignore
    catch (err: Error) {
        return res.status(500).json({ err: 'An error occurred while trying to fetch the student.' })
    }
}

export const getAllStudents = async (_: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
        const allStudents = await students.find({})
        return res.status(200).json(students)
    }
    //@ts-ignore
    catch (err: Error) {
        return res.status(500).json({ err: 'An error occurred while trying to fetch all students.' })

    }
}


export const updateStudent = async (_: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { fullname, whatsapp, grade, studentId }: IStudent = _.body
    try {
        const updatedStudent = await students.findByIdAndUpdate(studentId, { fullname, whatsapp, grade }, { new: true })
        if(!updateStudent){ return res.status(404).json({ err: 'No student found with the provided ID.' });}
        return res.status(200).json(updateStudent)

    }
    //@ts-ignore
    catch (err: Error) {
        return res.status(500).json({ err: 'An error occurred while trying to update the student.' })

    }
}

export const deleteStudent = async(_: Request, res: Response):Promise<Response<any, Record<string, any>>>=>{
    const {studentId}:IStudent = _.body
    try {
        const deletedStudent = await students.findByIdAndDelete(studentId)
        if (deletedStudent) {
            return res.status(200).json({msg:'Student deleted successfully!'})
        }
        return res.status(404).json({ err: 'No student found with the provided ID.' });
    }
    //@ts-ignore
    catch (err: Error) {
        return res.status(500).json({ err: 'An error occurred while trying to delete the student.' })

    }
}
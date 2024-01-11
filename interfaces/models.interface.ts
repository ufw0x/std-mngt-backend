import type { Schema } from "mongoose";

export interface Admin{
    username:Schema.Types.String,
    password:string|Buffer,
    email:Schema.Types.String,
    avatar?:Schema.Types.String | Schema.Types.Buffer,
}
export interface Student{
    fullname:Schema.Types.String,
    whatsapp:Schema.Types.String,
    grade:Schema.Types.Number,
    attendences:Schema.Types.ObjectId[],
    payments:Schema.Types.ObjectId[],
    exams:Schema.Types.ObjectId[],
    classes:Schema.Types.ObjectId[],
    stdId:Schema.Types.String
}
export interface Class{
    attendences?:Schema.Types.ObjectId[],
    className:Schema.Types.String,
    classGrade:Schema.Types.Number,
    payments?:Schema.Types.ObjectId[],
    weekDate:Schema.Types.String,
    time:Schema.Types.String
}

export interface Exam{
    studentId: Schema.Types.ObjectId,
    classId: Schema.Types.ObjectId,
    markedBy: Schema.Types.ObjectId,
    heldIn:Schema.Types.Date,
    hash: Schema.Types.String,
    previousHash: Schema.Types.String
}

export interface Payment{
    studentId:Schema.Types.ObjectId,
    classId:Schema.Types.ObjectId,
    markedBy:Schema.Types.ObjectId,
    forMonth:Schema.Types.String,
    year:Schema.Types.Number
}

export interface Attendence{
    studentId:Schema.Types.ObjectId,
    classId:Schema.Types.ObjectId,
    markedBy:Schema.Types.ObjectId,
    payments?:Schema.Types.ObjectId
    markedAt?:Schema.Types.Date
}
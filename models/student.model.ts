import { Schema, model } from "mongoose";
import type { Student } from "../interfaces/models.interface";

const studentSchema:Schema<Student> = new Schema({
    fullname:{
        type:Schema.Types.String,
        required:true
    },
    whatsapp:{
        type:Schema.Types.String,
        required:true
    },
    grade:{
        type:Schema.Types.Number,
        required:true
    },
    attendences:[{
        type:Schema.Types.ObjectId,
        ref:"attendences"
    }],
    payments:[{
        type:Schema.Types.ObjectId,
        ref:"payments"
    }],
    exams:[{
        type:Schema.Types.ObjectId,
        ref:"exams"
    }],
    classes:[{
        type:Schema.Types.ObjectId,
        ref:"classes"
    }],
    stdId:{
        type:Schema.Types.String,
        required:true
    }
})

export const students = model('students', studentSchema)
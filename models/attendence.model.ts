import { Schema, model } from "mongoose";
import type { Attendence } from "../interfaces/models.interface";

const attendenceSchema:Schema<Attendence> = new Schema({
    studentId:{
        type:Schema.Types.ObjectId,
        ref:'students'
    },
    classId:{
        type:Schema.Types.ObjectId,
        ref:'classes'
    },
    markedBy:{
        type:Schema.Types.ObjectId,
        ref:'admins'
    },
    payments:{
        type:Schema.Types.ObjectId,
        ref:'payments' 
    },
    markedAt:{
        type:Schema.Types.Date,
        default:Date.now()
    }
})

attendenceSchema.index({studentId:1, classId:1})

export const attendences = model('attendences', attendenceSchema)
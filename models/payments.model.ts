import { Schema, model } from "mongoose";
import type { Payment } from "../interfaces/models.interface";

const paymentSchema:Schema<Payment> = new Schema({
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
    forMonth:{
        type:Schema.Types.String,
        required:true
    },
    year:{
        type:Schema.Types.Number,
        default:new Date().getFullYear(),
        required:true
    }
})

export const payments = model('payments', paymentSchema)
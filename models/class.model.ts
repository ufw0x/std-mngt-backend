import { Schema, model } from "mongoose";
import type { Class } from "../interfaces/models.interface";

const classSchema:Schema<Class> = new Schema({
    attendences:[{
        type:Schema.Types.ObjectId,
        ref:'attendences'
    }],
    className:{
        type:Schema.Types.String,
        required:true
    },
    classGrade:{
        type:Schema.Types.Number,
        required:true
    },
    weekDate:{
        type:Schema.Types.String,
        required:true
    },
    time:{
        type:Schema.Types.String,
        required:true
    },
    payments:[{
        type:Schema.Types.ObjectId,
        ref:'payments' 
    }]
})

export const classes = model('classes', classSchema)
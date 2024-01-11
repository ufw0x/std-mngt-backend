import { Schema, model } from "mongoose";
import type { Exam } from "../interfaces/models.interface";

const examSchema: Schema<Exam> = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'students'
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'classes'
    },
    markedBy: {
        type: Schema.Types.ObjectId,
        ref: 'admins'
    },
    heldIn: {
        type: Schema.Types.Date,
        required: true
    },
    hash: {
        type: Schema.Types.String,  // studentId+classId+markedBy+heldIn -----> hash
        required: true
    },
    previousHash: {
        type: Schema.Types.String,
        required: true
    }
})

export const exams = model('exams', examSchema)
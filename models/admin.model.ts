import { Schema, model } from "mongoose";
import type { Admin } from "../interfaces/models.interface";

const adminSchema:Schema<Admin> = new Schema({
    username:{
        type:Schema.Types.String,
        required:true
    },
    password:{
        type:Schema.Types.String,
        required:true
    },
    email:{
        type:Schema.Types.String,
        required:true
    },
    avatar:{
        type:Schema.Types.String || Schema.Types.Buffer,
        required:false
    }
})

export const admins = model('admins', adminSchema)
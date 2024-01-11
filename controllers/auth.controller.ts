import type { Request, Response } from "express";
import type { Admin } from "../interfaces/models.interface";
import { admins } from "../models/admin.model";
import {compare, hashSync} from "bcrypt"

export const createAdmin = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { username, email, password, avatar }: Admin = req.body;
    const hashedPassword = hashSync(password, 10)
    const newAdmin: Admin = { username, email, password:hashedPassword}
    if (avatar) {
        newAdmin["avatar"] = avatar;
    }
    try{
        await (await admins.create(newAdmin)).save().catch((err:Error)=>{
            throw new Error(err.message)
        })
        return res.status(201).json({ msg: "Admin created successfully!" })
    }
    //@ts-ignore
    catch(err:Error){
        return res.status(500).json({err:err.message})
    }
}

export const loginAdmin = async(req:Request, res:Response):Promise<Response<any, Record<string, any>>>=>{
    const {username, password}:{username:String, password:string } =  req.body;
    const  existAdmins = await admins.findOne({username})
    if(!existAdmins){return res.status(401).json({error:'Admin does not exist!'})};
    const isPasswordValid = await compare(password, existAdmins.password.toString())
    if(!isPasswordValid){return res.status(401).json({error:'Invalid credentials'})};
    try{
        //@ts-ignore
        req.session.admin = {username};
        return res.status(200).json({msg:'Admin authenticated successfully!'})
    }
    //@ts-ignore
    catch(err:Error){
        return res.status(500).json({err:err.message})
    }
}

export const adminLogout = async(req:Request, res:Response):Promise<any>=>{
    req.session.destroy((err:Error)=>{
      if(err){return res.status(500).json({err:err.message})};
      return res.redirect('/login')
    })
}
import type { Request, Response } from "express";
import type { Payment } from "../interfaces/models.interface";
import { payments } from "../models/payments.model";

const createPayment = async(_:Request, res:Response)=>{
    const paymentData:Payment = {
        //@ts-ignore
        studentId:_.studentID,
        //@ts-ignore
        classId:_.classId,
        year: new Date().getFullYear().toString(),
        //@ts-ignore
        forMonth:_.forMonth,
        //@ts-ignore
        markedBy:_?.session?.admin?.username,

    }
   try{
    (await payments.create(paymentData)).save().then(()=>{
        //todooooo
    })
   }
   catch(err:Error|any){
    return res.status(501).json({error:err.message})
   }
    
}
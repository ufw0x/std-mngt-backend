import type { NextFunction, Request, Response } from "express";

export const authenticateAdmin = async(_:Request, res:Response, next:NextFunction)=>{
    //@ts-ignore
   if(!(_?.session?.admin?.username && _.session)){return res.redirect('/login')};
   next()
}
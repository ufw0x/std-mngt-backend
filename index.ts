import express, { type Application, type NextFunction, type Request, type Response } from "express"
import helmet from "helmet"
import { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import { authRouter } from "./routes/auth.routes"
import session from "express-session"

config()

const app:Application = express()
const port:number = parseInt(process.env.PORT || '9817')

app.use(session({
   secret:process.env.CLIENT_SECRET || "",
   resave:false,
   saveUninitialized:true,
   cookie:{secure:false}
}))
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/auth', authRouter)


app.listen(port, ():void=>{
    console.log(`\x1b[33m⚡️\x1b[0mServer is listening on port: ${port}`);
})

if(process.env.NODE_ENV==="development"){
    app.use((req:Request, res:Response, next:NextFunction):void=>{
       console.log(`method:\"${req.method}\"   url:\"${req.url}\"  host:\"${req.hostname}\"`)
       next()
    })
}


(async()=>{
 if(process.env.MONGO_URI){
    await mongoose.connect(process.env.MONGO_URI).then(()=>console.log(`  Connected to database :)`))
 }else{
    console.error(`  MONGO_URI value in .env not found!`)
 }
})()
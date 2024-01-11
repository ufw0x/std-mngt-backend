import { Router } from "express";
import { adminLogout, createAdmin, loginAdmin } from "../controllers/auth.controller";
import { authenticateAdmin } from "../middlewares/auth.middleware";

export const authRouter:Router = Router()

authRouter.post('/signup', createAdmin)
authRouter.post('/login', loginAdmin)
authRouter.get('/logout', authenticateAdmin, adminLogout)
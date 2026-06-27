import { Router } from "express";
import {userModel} from '../model/db.js'

const userRouter = Router();

userRouter.post("/signup", (req, res) => {});

userRouter.post("/signin", (req, res) => {});

userRouter.get("/purchases", (req, res) => {});

export default userRouter;

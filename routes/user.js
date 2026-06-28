import { Router } from "express";
import {purchaseModel, userModel} from '../model/db.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userMiddleware from "../middleware/user.js";

dotenv.config()

const userRouter = Router();

userRouter.post("/signup", async(req, res) => {
    const {email, password, firstName, lastName} = req.body;

    try{
        await userModel.create({
        email,
        password,
        firstName,
        lastName,
    })
    } catch(e){
        console.log(e.message)
    }
     
    res.json({
        msg: "Signup succeeded"
    })

});

userRouter.post("/signin", async(req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({
        email, password
    })
    if(user){
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_USER_PASSWORD)

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            msg: "Incorrect Credentials"
        })
    }
});

userRouter.get("/purchases", userMiddleware, async(req, res) => {
    const userId = req.userId;

    const purchases = await purchaseModel.find({})
    res.json({
        purchases
    })
});



export default userRouter;

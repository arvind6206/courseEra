import { Router } from "express";
import {userModel} from '../model/db.js'
import jwt from 'jsonwebtoken'

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

userRouter.get("/purchases", (req, res) => {});

export default userRouter;

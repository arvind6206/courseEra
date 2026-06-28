import {Router} from 'express'
import {adminModel} from '../model/db.js '
import jwt from 'jsonwebtoken'
import adminMiddleware from '../middleware/admin.js'
import { courseModel, userModel } from '../model/db.js'

import dotenv from 'dotenv'

dotenv.config()


const adminRouter = Router()

adminRouter.post('/signup', async(req, res) => {
    const {email, password, firstName, lastName} = req.body;

    try{
        await adminModel.create({
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

})

adminRouter.post('/signin', async(req, res) => {
    const {email, password} = req.body
        const admin = await adminModel.findOne({
            email, password
        })
        if(admin){
            const token = jwt.sign({
                id: admin._id
            }, process.env.JWT_ADMIN_PASSWORD)
    
            res.json({
                token: token
            })
        } else {
            res.status(403).json({
                msg: "Incorrect Credentials"
            })
        }
})

adminRouter.post('/course', adminMiddleware, async(req, res) => {
    const adminId = req.userId
    const {title, description, imageUrl, price} = req.body

    const course = await userModel.create({
        title,
        description,
        imageUrl,
        price,
        creatorId: adminId
    })

    res.json({
        msg: "course created",
        courseId: course._id
    })
})

adminRouter.put('/course', adminMiddleware, async(req, res) => {
     const adminId = req.userId
    const {title, description, imageUrl, price, courseId} = req.body



    const course = await userModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title,
        description,
        imageUrl,
        price,
    })

    res.json({
        msg: "course updated",
        courseId: course._id
    })
})

adminRouter.get('/course/bulk', adminMiddleware, async(req, res) => {
    const adminId = req.userId
    const courses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        message: "Courses are",
        courses
    })
})

export default adminRouter
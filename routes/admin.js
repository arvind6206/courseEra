import {Router} from 'express'
import {adminModel} from '../model/db.js '
import jwt from 'jsonwebtoken'
import { JWT_ADMIN_PASSWORD } from '../config.js'
import adminMiddleware from '../middleware/admin.js'
import { userModel } from '../model/db.js'


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
            }, JWT_ADMIN_PASSWORD)
    
            res.json({
                token: token
            })
        } else {
            res.status(403).json({
                msg: "Incorrect Credentials"
            })
        }
})

adminRouter.post('/course', async(req, res) => {
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

adminRouter.put('/course', adminMiddleware, (req, res) => {
    
})

adminRouter.get('/course/bulk', (req, res) => {
    
})

export default adminRouter
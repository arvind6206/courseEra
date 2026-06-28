import {Router} from 'express'
import {adminModel} from '../model/db.js '
import jwt from 'jsonwebtoken'

const JWT_ADMIN_PASSWORD = "kou%fy7gy"

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

adminRouter.post('/course', (req, res) => {
    
})

adminRouter.put('/course', (req, res) => {
    
})

adminRouter.get('/course/bulk', (req, res) => {
    
})

export default adminRouter
import {Router} from 'express'
import {courseModel, purchaseModel} from '../model/db.js'
import userMiddleware from '../middleware/user.js';

const courseRouter = Router()
  courseRouter.post("/purchase", userMiddleware, async(req, res) => {
    const userID = req.userId
    const courseId = req.body.courseId

    await purchaseModel.create({

        userId,
        courseId
    })
    res.json({
        msg: "you have successfully bought tye course"
    })
  });

  courseRouter.get("/preview", async(req, res) => {
    const courses = await courseModel.find({})
      res.json({
        courses
      }) 
  });
 

export default courseRouter
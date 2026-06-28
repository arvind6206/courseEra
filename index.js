import express from 'express'
import userRouter from './routes/user.js'
import courseRouter from './routes/course.js'
import adminRouter from './routes/admin.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
 
const app = express()
app.use(express.json())


app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin", adminRouter)

async function main(){
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(3000)
    console.log("Server is running on port 3000")

}
main()


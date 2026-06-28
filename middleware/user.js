import jwt from 'jsonwebtoken'
import { JWT_USER_PASSWORD } from '../config.js'

function userMiddleware(req, res, next){
    const token = req.headers.token
    const decoded = jwt.verify(token, JWT_USER_PASSWORD)

    if(decoded){
        req.userId = decoded.id
        next()
    }
    else {
        res.json({
            msg: "You are not signed in"
        })
    }
}
export default userMiddleware
import jwt from 'jsonwebtoken'

function userMiddleware(req, res, next){
    const token = req.headers.token
    const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD)

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
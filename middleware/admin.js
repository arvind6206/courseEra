import jwt from 'jsonwebtoken'

function adminMiddleware(req, res, next){
    const token = req.headers.token
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_PASSWORD)

    if(decoded){
        req.adminId = decoded.id
        next()
    }
    else {
        res.json({
            msg: "You are not signed in"
        })
    }
}
export default adminMiddleware
import jwt from "jsonwebtoken"
import AppError from "../utils/AppError.js"
const userAuthMid = (req, res, next) => {
    console.log(req.headers,"dddddddddddddddddddd");
    let token = ''
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    console.log(token,"mid token");
    if (!token) {
       throw new AppError('userNot found',403)
    }
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
        console.log(userId,'userId');
        if(!userId){
            throw new AppError('invalid token',403)
        }
        req.userId = userId
        next()
    } catch (error) {
        console.log(error.message,"jjjj");
        throw new AppError('invalid token please login',403)
    }
}

export default userAuthMid

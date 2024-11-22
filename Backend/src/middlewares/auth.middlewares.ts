import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken"
import { HttpStatus } from '~/constants/httpStatus';
import { Message } from '~/constants/message';

// middleware check token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token)
    if(!token) {
        return res.status(HttpStatus.FORBIDDEN).json({
            message: Message.TOKEN_NOT_PROVIDED
        })
    };
    try {
        const decoded = jwt.verify(token.split(" ")[1], 'secret_key');
        req.user = decoded;
        next();
    } catch(err) {
        res.status(HttpStatus.UNAUTHORIZED).json({
            message: Message.TOKEN_INVALID
        })
    }
};

export default verifyToken;
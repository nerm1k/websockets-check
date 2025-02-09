import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from ".././utils/enums";
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.headers.authorization?.split(' ')[1];

    if (!jwtToken) {
        res.sendStatus(HttpStatusCode.UNAUTHORIZED);
    } else {
        jwt.verify(jwtToken, process.env.JWT_SECRET || 'secret', (err, user) => {
            if (err) {
                return res.sendStatus(HttpStatusCode.FORBIDDEN)
            }
            req.body.user = user;
            next();
        })
    }
}
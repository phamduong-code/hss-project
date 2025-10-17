import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../../../db/models/user.js';
import handlerUser from '../../../controllers/handleUser.js';
const userRouter = Router();

userRouter.get(
    '/',
    asyncHandler(async (req, res, next) => {
        res.send('User route is working');
    })
);
userRouter.post(
    '/register',
    asyncHandler(async (req, res, next) => {
        const userData = req.body;
        const pw = userData.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pw, salt);
        const newUser = new User({
            ...userData,
            password: hash,
        });
        const result = await newUser.save();
        res.status(201).json(result);
    })
);
userRouter.post('/login', handlerUser.login);
export default userRouter;

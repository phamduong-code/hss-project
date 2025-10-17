import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../db/models/user.js';
const login = async (req, res, next) => {
    asyncHandler(async (req, res, next) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'User login successful' });
    });
};

const register = async (req, res, next) => {
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
};

const forgetPassword = async (req, res, next) => {
    res.send('Forget password route is working');
};

const handlerUser = {
    login,
    register,
    forgetPassword,
};

export default handlerUser;

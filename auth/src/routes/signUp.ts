import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '@cpvtickets/common'; 
import validateRequest from '@cpvtickets/common/build/middlewares/validate-request';

import { User } from '../models/users';

const router = express.Router();

router.post('/api/users/signup', [

    body('username').isLength({ min: 1 }).withMessage('Username must be valid'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 4 }).withMessage('Password must be valid'),
    validateRequest
], async (req: Request, res: Response) => {

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new BadRequestError('Email already in use');
    }

    const user = User.build({ username, email, password });
    await user.save();

    const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!);
    req.session = { jwt: userJwt };

    res.status(201).send({ user, userJwt });
});

export { router as signUpRouter };
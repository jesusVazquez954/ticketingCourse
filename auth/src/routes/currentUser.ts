import express, { Response, Request } from 'express';

import { currentUser, requireAuth } from '@cpvtickets/common'; 

const router = express.Router();

router.get('/api/users/currentuser', [
    currentUser,
    requireAuth
], (req: Request, res: Response) => {

    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
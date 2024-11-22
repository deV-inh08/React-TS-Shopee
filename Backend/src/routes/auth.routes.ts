import { Router } from 'express'
import { Message } from '~/constants/message';
import { Register, Login } from '~/controllers/auth.controllers';
import verifyToken from '~/middlewares/auth.middlewares';
const authRouter = Router();

// Register
authRouter.post('/register', Register as any)

// Login
authRouter.post('/login', Login as any)

// Logout
authRouter.post('/logout', verifyToken as any, (req, res) => {
    res.json({
        message: Message.LOGOUT_SUCCESS
    })
});

export default authRouter;
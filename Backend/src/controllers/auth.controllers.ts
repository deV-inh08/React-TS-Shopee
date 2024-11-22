import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserType } from '~/models/user.model'
import fs from 'fs'
import { HttpStatus } from '~/constants/httpStatus'
import { Message } from '~/constants/message'

const readUsers = (): UserType[] => {
    let data;
    try {
        data = fs.readFileSync('./users.json', 'utf8');
        if(!data) return []
        return JSON.parse(data) 
    } catch(err) {
        console.error("Error reading users.json:", err)
        return []
    }
    
};

const writeUser = (users: UserType[]) => {
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2))
};


// Register
const Register = (req: Request, res: Response) => {
    const { email, password } = req.body
    const users = readUsers();

    if (users.find((user) => user.email === email)) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            message: Message.ERROR,
            data: {
                email: Message.EMAIL_EXISTS
            }
        })
    };

    const newUser: UserType = {
        id: users.length + 1,
        email,
        password,
        roles: 'user'
    };

    users.push(newUser);
    writeUser(users);

    const token = jwt.sign({ email, roles: newUser.roles }, 'secret_key', { expiresIn: '7d' })
    
    res.json({
        message: Message.REGISTER_SUCCESS,
        data: {
          access_token: `Bearer ${token}`,
          expires: '7d',
          user: newUser
        }
      });
};

// Login
const Login = (req: Request, res: Response) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find((user) => user.email === email && user.password === password);
    if(!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            message: Message.USER_NOT_EXIST
        })
    };
    const token = jwt.sign({ email, roles: user.roles }, 'secret_key', { expiresIn: '7d' });
    res.json({
        message: Message.LOGIN_SUCCESS,
        data: {
            access_token: `Bearer ${token}`,
            expires: '7d',
            user
        }
    })
}

export {
    Register,
    Login
}
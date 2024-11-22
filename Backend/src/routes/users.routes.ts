import {  Router } from 'express'
import { updateUserProfile } from '~/controllers/users.controllers'

const userRouter = Router()

userRouter.put('/', updateUserProfile, (req, res) => {
    console.log("Get 1")
})
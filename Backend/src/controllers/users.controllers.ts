import { Request, Response } from 'express'

const updateUserProfile = (req: Request, res: Response) => {
    const { name, email, password } = req.body
    res.status(200).json({
        message: "Get information success"
    })
}

export {
    updateUserProfile
}
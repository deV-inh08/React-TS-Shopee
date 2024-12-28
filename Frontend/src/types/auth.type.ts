// Authenticate
import {SuccessResponse } from "./utils.type"
import { User } from "./user.type"
export type AuthResponse = SuccessResponse<{
    access_token: string
    expires: string
    user: User
}>

export type RefreshTokenReponse = SuccessResponse<{ access_token: string }>
import http from "../utils/httpAuth";
import { AuthResponse } from "../types/auth.type";

// method 1
// export const registerAccount = (body: {email: string; password: string}) => http.post<AuthResponse>("/register", body)
// export const loginAccount = (body: {email: string; password: string}) => http.post<AuthResponse>("/login", body)
// export const logout = () => http.post("/logout")


const authAPI = {
  registerAccount: (body: {email: string; password: string}) => {
    return http.post<AuthResponse>("/register", body)
  },
  loginAccount: (body: {email: string; password: string}) => {
    return http.post<AuthResponse>("/login", body)
  },
  logout: () => {
    return http.post('/logout')
  }
};

export default authAPI;
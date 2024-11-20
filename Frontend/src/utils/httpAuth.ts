/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {AxiosError, type AxiosInstance} from "axios";
import HttpStatusCode from "../constants/httpStatusCode.enum";
import { toast } from "react-toastify";
import { AuthResponse } from "../types/auth.type";
import { clearLocalStorage, getAccessTokenFromLS, saveAccessTokenToLS } from "./auth";
import path from "../constants/path";

class Http {
    instance: AxiosInstance
    private accessToken: string
    constructor() {
        this.accessToken = getAccessTokenFromLS()
        this.instance = axios.create({
            baseURL: "http://localhost:3001/",
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            }
        })
        this.instance.interceptors.request.use((config) => {
            if(this.accessToken) {
                config.headers.Authorization = `${this.accessToken}`
                return config
            }
            return config
        }, (error) => {
            return Promise.reject(error)
        });

        this.instance.interceptors.response.use(
            (response) =>  {
                console.log(response)
                const { url } = response.config
                if(url ===path.login|| url === path.register) {
                    this.accessToken = (response.data as AuthResponse).data.access_token
                    saveAccessTokenToLS(this.accessToken)
                } else if(url === path.logout) {
                    this.accessToken = ""
                    clearLocalStorage()
                }
                return response
            },
            function(error: AxiosError) {
                if (
                    ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
                  )  {
                    const data: any | undefined = error.response?.data
                    const message = data?.message || error.message
                    toast.error(message)
                }
                return Promise.reject(error)
            }
        )
    }
};

const http = new Http().instance;
export default http;
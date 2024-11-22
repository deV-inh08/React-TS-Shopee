import { User } from "../types/user.type";


const LocalStorageEventTarget = new EventTarget();

const saveAccessTokenToLS = (access_token: string) => {
    localStorage.setItem("access_token", access_token)

};

const clearLocalStorage = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("profile")
    const clearLocalStoragedEvent = new Event("clearLocalStorage")
    LocalStorageEventTarget.dispatchEvent(clearLocalStoragedEvent)
};

const getAccessTokenFromLS = (key: string = "access_token") => localStorage.getItem(key) || "" 

const getProfileFromLS = () => {
    const result = localStorage.getItem("profile");
    return result ? JSON.parse(result): null
}

const setProfileToLS = (profile: User) => {
    localStorage.setItem("profile", JSON.stringify(profile))
}

export {
    saveAccessTokenToLS,
    clearLocalStorage,
    getAccessTokenFromLS,
    getProfileFromLS,
    setProfileToLS,
    LocalStorageEventTarget
}
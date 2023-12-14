import {getGlobalState, setGlobalState} from "@/state";
import {getCookie} from "@/shared/cookieService";
import {validateToken} from "@/shared/jwtService";

export function loadUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {

        //validate Token from cookie and set it to global state

        const token = getCookie('accessToken');
        if (token) {
            const isValid  = validateToken(token);
            if (isValid) {
                const userObject = JSON.parse(user);
                setGlobalState("user",userObject);
            }
        }

    }

}

export function isAdmin() {
    const user = getGlobalState("user")
    return (user && user.userType === "admin")
}
export function isStudent() {
    const user = getGlobalState("user")
    return (user && user.userType === "student")
}
export function isInstitute() {
    const user = getGlobalState("user")
    return (user && user.userType === "institution")
}
export function isOrganisation() {
    const user = getGlobalState("user")
    return (user && user.userType === "organization")
}


export function saveUserInfo(user) {
    localStorage.setItem('user', JSON.stringify(user));
    setGlobalState("user",user);
}

export function saveTokenInfo(access_token) {
    localStorage.setItem('access_token', JSON.stringify(access_token));
    console.log("access_token",access_token)
    setGlobalState("access_token",access_token);
}

export function getAccessToken() {
    const resp = localStorage.getItem('access_token') || null;
    if (resp) {
        return JSON.parse(resp);
    }
    return null;
}


export function removeAuthFromStorage() {
    localStorage.removeItem('user');
    setGlobalState("user",null);
}




export function isValidUser() {
    localStorage.removeItem('user');
    setGlobalState("user",null);
}



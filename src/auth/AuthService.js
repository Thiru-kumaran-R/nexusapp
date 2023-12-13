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


export function removeAuthFromStorage() {
    localStorage.removeItem('user');
    setGlobalState("user",null);
}




export function isValidUser() {
    localStorage.removeItem('user');
    setGlobalState("user",null);
}



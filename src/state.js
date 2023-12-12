import { createGlobalState } from "react-hooks-global-state";

// Initial state without TypeScript interface
const AppInitialState = {
    access_token: null,
    notification: null,
    user: {
        id: null,
        roles: "",
        email: ""


    }
};


export const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState(AppInitialState);

export const removeGlobalState = (key) => {
    if (key === "access_token") {
        setGlobalState(key, null);
    } else if (key === "user") {
        setGlobalState(key, {
            id: null,
            roles: "",
            email: ""
        });
    }
};

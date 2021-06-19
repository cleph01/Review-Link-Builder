const AuthReducer = (state, action) => {
    switch (action.type) {
        case "SIGNUP":
            localStorage.setItem("user", JSON.stringify(action.payload.id[0]));
            localStorage.setItem("token", JSON.stringify(action.payload.token));

            return {
                ...state,
                isAuthenticated: true,
                id: action.payload.id,
                token: action.payload.token,
            };

        case "LOGIN":
            console.log("LOGIN PAYLOAD: ", action.payload);

            localStorage.setItem("user", JSON.stringify(action.payload.id));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            localStorage.setItem("name", JSON.stringify(action.payload.name));

            return {
                ...state,
                isAuthenticated: true,
                id: action.payload.id,
                token: action.payload.token,
                name: action.payload.name,
            };

        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };

        default:
            return state;
    }
};

export default AuthReducer;

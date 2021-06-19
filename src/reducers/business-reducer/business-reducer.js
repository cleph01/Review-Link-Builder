const LinkReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_LINKS":
            return {
                ...state,
                isFetching: true,
                id: action.payload.id,
                token: action.payload.token,
            };

        default:
            return state;
    }
};

export default LinkReducer;

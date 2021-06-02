const initialState = {
    cardList: [],
    isLoading: false,
    error: false,
    loadMore: true,
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "FETCH_CARDS":
            return {
                ...state,
                isLoading: true,
            };

        case "FETCH_CARDS_SUCCESS":
            return {
                ...state,
                cardList: [...state.cardList, ...action.payload.cardList],
                isLoading: false,
                loadMore: action.payload.loadMore,
            };

        case "FETCH_CARDS_FAILED":
            return {
                ...state,
                error: true,
                isLoading: false,
            };

        default:
            return state;
    }
}

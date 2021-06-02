export const fetchCards = () => {
    return { type: "FETCH_CARDS" };
};

export const fetchCardsFailed = () => {
    return { type: "FETCH_CARDS_FAILED" };
};

export const fetchCardsSuccess = (payload) => {
    return { type: "FETCH_CARDS_SUCCESS", payload };
};

export const initialState = {
    basket: [],
    user: null,
};

export const actionTypes = {
    ADD_TO_BASKET: 'ADD_TO_BASKET',
    REMOVE_FROM_BASKET: 'REMOVE_FROM_BASKET',
    SET_USER: 'SET_USER',
    EMPTY_BASKET: 'EMPTY_BASKET',
};

export const getBasketTotal = (basket) => basket?.reduce((total, item) => total + item.price, 0);

const reducer = (state = initialState, action) => {
    console.log(action);

    switch(action.type) {
        case actionTypes.ADD_TO_BASKET:
            return {
                ...state,
                basket: [...state.basket, action.item]
            };

        case actionTypes.EMPTY_BASKET:
            return {
                ...state,
                basket: [],
            }

        case actionTypes.REMOVE_FROM_BASKET:
            const index = state.basket.findIndex(item => item.id === action.id);
            const newBasket = [ ...state.basket ];

            if (index >= 0) {
                newBasket.splice(index, 1);
            }

            return {
                ...state,
                basket: newBasket,
            };
        
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        default:
            return state;
    }
};

export default reducer;
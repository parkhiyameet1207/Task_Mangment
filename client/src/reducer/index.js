const intial = {
    lists: [],
    listAlldata: [],
    cards: [],
    cardalldata: []
}

const taskreducer = (state = intial, action) => {
    console.log("action.payload", action.payload);
    switch (action.type) {
        case 'ADD_LISTS':
            return {
                ...state,
                lists: [...state.lists, action.payload]
            }
        case 'GET_LISTS':
            return {
                ...state,
                listAlldata: [...state.listAlldata, action.payload]
            }
        case "ADD_CARD": {
            return {
                ...state,
                cards: [...state.cards, action.payload]
            };
        }

        case "GET_CARDS": {
            console.log("action.payload", action.payload);
            return {
                ...state,
                cardalldata: [...state.cardalldata, action.payload]
            }
        }

        case 'MOVE_CARD':
            const {
                oldCardIndex,
                newCardIndex,
                sourceListId,
                destListId
            } = action.payload;

            if (destListId == sourceListId) {
                const [carddata] = state.cardalldata;
                const [removedCard] = carddata.splice(oldCardIndex, 1);
                carddata.splice(newCardIndex, 0, removedCard);

                console.log("carddata😎😎😎😎😎😎😎😎", carddata);
                return {
                    ...state,
                    cardalldata: [...state.cardalldata, carddata]
                }
            }




        // case 'CHANGE_CARD_TEXT' :
        //     const allcard  = state.cardalldata;

        //     // const index = allcard.findIndex((card) => card.id === action.payload.id);
        //     return {
        //     }
        default:
            return state

    }
}

export default taskreducer;
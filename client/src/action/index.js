import axios from 'axios';

export const addAllListAsyncData = (data) => {
    return async (dispatch) => {
        await axios.post('http://localhost:5000/api/board/addlist', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            dispatch({
                type: 'ADD_LISTS',
                payload: res.data
            })
        });

    };
};

export const getAllListAsyncData = () => {
    return async (dispatch) => {
        await axios.get('http://localhost:5000/api/board/getlsit', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            dispatch({
                type: 'GET_LISTS',
                payload: res.data
            })
        });

    };
};


export const addCardAsyncData = (data) => {
    return async (dispatch) => {
        await axios.post('http://localhost:5000/api/board/addcard', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then((res) => {
            console.log("res.data post::::::::::::: >", res.data);
            dispatch({
                type: "ADD_CARD",
                payload: res.data
            });
        })

    }
}


export const getAllCardAsyncData = () => {
    return async (dispatch) => {
        await axios.get('http://localhost:5000/api/board/getcard').then((res) => {
            console.log("res.data get card ::::::::::::: >", res.data);
            dispatch({
                type: "GET_CARDS",
                payload: res.data
            });
        })

    }
}

export const editCardTitleAsyncData = (data, id) => {
    return async (dispatch) => {
        await axios.put(
            `http://localhost:5000/api/board/lists/${id}`,
            { title: data },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            // dispatch(
            //     {
            //         type: "CHANGE_CARD_TEXT",
            //         payload: res.data
            //     }
            // )
        })

    };
};

export const deleteAsyncCardData = (id) => {
    return async (dispatch) => {
        await axios.delete(
            `http://localhost:5000/api/board/lists/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            console.log("res delete :::::: >", res);
            // dispatch(
            //     {
            //         type: "CHANGE_CARD_TEXT",
            //         payload: res.data
            //     }
            // )
        })

    };
};

export const movecardposition = (data) => {
    return async (dispatch) => {
        
        dispatch({
            type: "MOVE_CARD",
            payload: data
          })
    }
    // return {
    //     type: "MOVE_CARD",
    //     payload: {
    //       sourceListId: source.droppableId,
    //       destListId: destination.droppableId,
    //       oldCardIndex: source.index,
    //       newCardIndex: destination.index
    //     }
    //   }
}
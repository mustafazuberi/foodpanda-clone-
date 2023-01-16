export const authData = (auth) => {
    return (dispatch) => {
        dispatch({
            type: 'firebaseAuth',
            authData: auth
        })
    }
}


export const isAuthenticatedData = (is) => {
    return (dispatch) => {
        dispatch({
            type: 'firebaseLoggined',
            isAuthenticatedData: is
        })
    }
}


export const sendResturantData = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'firebaseResturantData',
            resturantData: data
        })
    }
}



export const sendResturantExists = (is) => {
    return (dispatch) => {
        dispatch({
            type: 'isResturant',
            resturantExists: is
        })
    }
}




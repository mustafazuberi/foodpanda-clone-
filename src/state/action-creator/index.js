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



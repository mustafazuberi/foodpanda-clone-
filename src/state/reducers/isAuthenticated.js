const isLoggined = false

const reducers = (state = isLoggined, action) => {
    if (action.type === 'firebaseLoggined') {
        return action.isAuthenticatedData
    }
    else {
        return state
    }
}
export default reducers


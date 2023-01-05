const myAuth = {}

const reducers = (state = myAuth, action) => {
    if (action.type === 'firebaseAuth') {
        return action.authData
    }
    else {
        return state
    }
}
export default reducers


const isResturant = false

const reducers = (state = isResturant, action) => {
    if (action.type === 'isResturant') {
        return action.resturantExists
    }
    else {
        return state
    }
}
export default reducers


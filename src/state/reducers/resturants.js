const resturantsData = "sadasdasd"

const reducers = (state = resturantsData, action) => {
    if (action.type === 'firebaseResturantData') {
        return action.resturantData
    }
    else {
        return state
    }
}
export default reducers

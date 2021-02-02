const initialState = {
    currentUser : 'Donald Trump'
}

const reducer = (state=initialState, action) =>{
   
        if(action.type === "Donald"){
            return {
                currentUser :  'Donald Trump'
            }
        }
        if(action.type === "Hillary"){
            return {
                currentUser :  'Hillary Clinton'
            }
        }
    return state
}

export default reducer;
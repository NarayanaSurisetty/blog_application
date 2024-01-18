
import { ActionTypes } from "../constants";

const initialState = {
    postData:[]
}
export const NewPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.NEWPOST_SUCCESS: {
            return {
                ...state,
                postData: action.payload,
            }
        }
        case ActionTypes.NEWPOST_FAIL:
            return state;
        default: return state
    }
}


import { ActionTypes } from "../constants";
import axios from 'axios';
import { myConstants } from '../../constants';

export const updateComments = (commentData) => {
    return async function getData(dispatch) {
        const result = await axios({
            url: myConstants.baseUrl + "BlogPost/UpdateBlogPostComment",
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: commentData
        }).then(res => {
            if (res.status == 200) {
                return { type: "success", data: res.data };
            } else {
                return { type: "error", message: res.data.message };
            }
        }).catch((error) => {
            if (error.response) {
                return { type: 'error', message: error.response.data ? error.response.data : error.message };
            } else {
                return { type: 'error', message: error.message };
            }
        });
        if (result.type === "success") {
            dispatch({ type: ActionTypes.UPDATECOMMENT_SUCCESS, payload: result });

        } else if (result.type === "error") {
            dispatch({ type: ActionTypes.UPDATECOMMENT_FAIL, payload: result.message });
        }
        return result;
    }
}


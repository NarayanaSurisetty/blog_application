import { ActionTypes } from "../constants";
import axios from 'axios';
import { myConstants } from '../../constants';

export const getAllBlogPosts = (postData) => {
    return async function getData(dispatch) {
        const result = await axios({
            url: myConstants.baseUrl + "BlogPost/GetAllBlogPosts",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: postData
        }).then(res => {
            if (res.status === 200) {
                return { type: "success", data: (res.data && res.data.length > 0) ? res.data.reverse() : res.data };
            } else {
                return { type: "error", message: res.data }
            }
        }).catch((error) => {
            if (error.response) {
                return { type: 'error', message: error.response.data? error.response.data : error.message };
            } else {
                return { type: 'error', message: error.message };
            }
        });
        if (result.type === "success") {
            dispatch({ type: ActionTypes.GETPOST_SUCCESS, payload: result });

        } else if (result.type === "error") {
            dispatch({ type: ActionTypes.GETPOST_FAIL, payload: result.message });
        }
        return result;
    }
}


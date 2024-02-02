import { ActionTypes } from "../constants";
import axios from 'axios';
import { myConstants } from '../../constants';

export const createNewPost = (postData) => {
    return async function getData() {
        const result = await axios({
            url: myConstants.baseUrl + "BlogPost/CreateNewPost",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: postData
        }).then(res => {
            if (res.status === 200) {
                return {type: "success", data: res.data};
            } else {
                return { type: "error", message: res.data }
            }
        }).catch((error) => {
            if (error.response) {
                return { type: 'error', message: error.response.data ? error.response.data : error.message };
            } else {
                return { type: 'error', message: error.message };
            }
        });
        return result;
    }
}


import { ActionTypes } from "../constants/actionTypes";
import axios from 'axios';
import { myConstants } from '../../constants';

export const createNewPost = (postData) => {
    return async function getData() {
        const result = await axios({
            url: myConstants.baseUrl + "api/Values/CreateBlogPost",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow_Origin": "*"
            },
            data: postData
        }).then(res => {
            if (res.status == 200) {
                return res.data;
            } else {
                return { type: "error", message: res.data.message }
            }
        }).catch((error) => {
            if (error.response) {
                return { type: 'error', message: error.response.data.message };
            } else {
                return { type: 'error', message: error.message };
            }
        });
        return result;
    }
}


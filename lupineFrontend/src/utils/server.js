import axios from 'axios';
import { rootEndpoint } from './constant';

export const endpoints ={
    login: {
        route: "login",
        method: "post"
    }, 
    signin:{
        route: "logout",
        method: "post"
    },
    logout: {
        route: "logout",
        method: "post",
    },
    chat: {
        route: "chat",
        method: "get"
    }, 
    chats:{
        route: "chats",
        method: "get"
    },
    addToChat: {
        route: "addToChat",
        method: "post",
    },
    createChat: {
        route: "createChat",
        method: "post"
    }, 
    message:{
        route: "message",
        method: "post"
    },
    leaveChat: {
        route: "leaveChat",
        method: "post",
    },
};

const server = async (endpoint, method, params = {}, body = {}) => {
    let urlParams = [];
    Object.keys(params).forEach(param => {
        urlParams.push([param, params[param]]);
    });
    params = new URLSearchParams(urlParams);
    console.log(params);
    const auth = localStorage.getItem("auth");
    // console.log(auth);
    if (method === "get" || method === "delete"){
        const res = await axios[method](`${rootEndpoint()}/${endpoint}`, { params, headers: { authorization: auth , 'Content-Type': 'application/json',
                'Accept': 'application/json'}  });
        return res;
    } else {
        const res = await axios[method](`${rootEndpoint()}/${endpoint}`, body, { params, headers: { authorization: auth } });
        return res;
    }
};

export default server;
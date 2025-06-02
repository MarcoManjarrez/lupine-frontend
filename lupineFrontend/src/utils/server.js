import axios from 'axios';
import { rootEndpoint } from './constant';

export const endpoints ={
    validateUser: {
        route: "login",
        method: "post"
    }, 
    createUser:{
        route: "createUser",
        method: "post"
    },
    logout: {
        route: "logout",
        method: "post",
    },
    getUserInfo: {
        route: "getUserInfo",
        method: "get",
    },
    getAllUsers: {
        route: "getAllUsers",
        method: "get",
    },
    createGroupChat: {
        route: "createChat",
        method: "post",
    },
    addToGroupChat: {
        route: "addToGroupCHat",
        method: "post",
    },
    sendMessage: {
        route: "sendMessage",
        method: "post",
    },
    getChats: {
        route: "getChats",
        method: "get",
    },
    getChatMessages: {
        route: "getChatMessages",
        method: "get",
    },
    deleteFromChat: {
        route: "deleteFromChat",
        method: "delete",
    },
    deleteChat: {
        route: "createChat",
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
        return res.data;
    } else {
        const res = await axios[method](`${rootEndpoint()}/${endpoint}`, body, { params, headers: { authorization: auth } });
        return res.data;
    }
};

export default server;
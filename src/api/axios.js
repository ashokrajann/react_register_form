import axios from 'axios';
const BASE_URL = 'http://localhost:3500';

export default axios.create({
    baseURL: BASE_URL
});


//Create a separate function to attach "Interceptors", Used to:
//1. Embed the JWT tokens in request
//2. Retry request to get the token (in case of intital failure)
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type" : "application/json" },
    withCredentials: true
});
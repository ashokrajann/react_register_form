import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useRefreshToken } from "./useRefreshToken";
import { useAuth } from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {

    //Create an interceptor for the Request (which attaches token while requesting)
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        //If no 'authorization' property in config ---> Then it's the first attempt
        if(!config.headers["Authorization"]) {
          config.headers["Authorization"]  = `Bearer ${auth?.accessToken}`;
        }
        return config;
      }
    )


    //Create an interceptor for the Response (which provides a new token)
    const responseIntercept = axiosPrivate.interceptors.response.use(
      //If reponse exists, simple return
      response => response,
      //Async error handler in case of error
      //Ex: When the token has expired, it's invalid
      async (error) => {
        const prevRequest = error?.config;
        //'Sent' custom property here is used to mark if a request was made earlier,
        //Since we don't want to be stuck in a loop of requesting tokens over & over
        if (error?.reponse?.status === 403 && !prevRequest.sent) {

          prevRequest.sent = true;

          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"]  = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequest);
        } 
        
        return (error) => Promise.reject(error)
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }

  }, [auth, refresh])

  return axiosPrivate;
}

export { useAxiosPrivate };
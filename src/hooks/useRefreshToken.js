import axios from "../api/axios"
import { useAuth } from "./useAuth"

const useRefreshToken = () => {

  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", { withCredentials: true });
    let accessToken = "";

    console.log(response.data);

    setAuth(prevState => {
      console.log(JSON.stringify(prevState));

      //Get the accessToken value from response
      accessToken = response.data.accessToken;
      console.log(accessToken);
      return { ...prevState, accessToken }
    });

    //We will call this function whenever the intital call fails (due to expired/missing accesstoken)
    //Return the token so we can use it in subsequent call (when retrying)
    return accessToken;
  }

  return refresh;
}

export { useRefreshToken }
import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {

  const { setAuth } = useAuth();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  //Hooks to Navigate user on login
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //Auto-Focus the first input element on page load
  useEffect(() => {
    // userRef.current.focus();    
  }, [])

  //Empty out any error message when user edits name/pwd
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd])

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({user, pwd}),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true
        }
      );

      console.log(response.data);

      //Store the 'accessToken' and 'role' in Context
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      
      //Clear the input fields on success
      setUser("");
      setPwd("");
      
      //Navigate user on succesful login (To whichever protected route they intended to access)
      navigate(from, { replace: true });

    } catch(error) {

      if(!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }

      //Set focus on the 'error' HTML element for screen reader to read it out
      errRef.current.focus();
    }

  }

  return (
    <section>
      <p 
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >{errMsg}</p>
      <h1>Log In</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}>

        {/* USERNAME */}
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        {/* PASSWORD */}
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Log In</button>
      </form>

      {/* SIGN UP */}
      <p>
        Need an account? <br />
        <span className="line">
          <a href="#">Sign up</a>
        </span> 
      </p>
    </section>
  )
}

export default Login
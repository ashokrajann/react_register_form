import { useRef, useState, useEffect } from "react"


function Login() {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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

    console.log("success..");
    setSuccess(true);

    //Clear the input fields on form submit
    setUser("");
    setPwd("");
  }

  return (
    <>
    { success ? (
      <section>
        <h1>You are Logged in!</h1>
        <br />
        <p>
          <a href="#">Got to home</a>
        </p>
      </section>
    ) : 
    (<section>
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
    </section>)}
    </>
  )
}

export default Login
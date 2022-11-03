import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../Firebase"


const Login = () => {
    const [intype, setintype] = useState('password')
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    async function loginHandel(e) {
        setLoading(true)
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password)
            setLoading(false)
            navigate('/home')
        } catch (err) {
            console.log(err);
            setLoading(false)
            setErr(true)
        }

    }


    return (
        <>
            <form onSubmit={loginHandel}>
                <h2>Live Chat</h2>
                <h5>Login</h5>
                <input type="email" placeholder="Your email" required />
                <input type={intype} placeholder="Your Password" required />
                <span onClick={() => setintype(intype === "password" ? "text" : "password")} className="password loginhide">{intype === "password" ? <AiFillEyeInvisible /> : <AiFillEye />}</span>

                <button className={loading === true ? "submitButton loading" : "submitButton"} type="submit">Login</button>

                <p>dont have an account??<Link className="link" to="/Register"> Sign up </Link> </p>
                <p style={{ color: 'red' }}>{err && "something went wrong"}</p>
            </form>
        </>
    );
}

export default Login;
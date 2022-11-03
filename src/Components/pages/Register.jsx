import { Link, useNavigate } from "react-router-dom";
import { FcImageFile } from "react-icons/fc"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"

const Register = () => {
    const [intype, setintype] = useState('password');
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    async function registerHandel(e) {
        setLoading(true)
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true)
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, 'userChats', res.user.uid), {})
                    });
                }
            );
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
            <form onSubmit={registerHandel}>
                <h2>Live Chat</h2>
                <h5>Register</h5>
                <input type="text" placeholder="Your name" required />

                <input type="email" placeholder="Your email" required />

                <input type={intype} placeholder="Your Password" required />
                <span onClick={() => setintype(intype === "password" ? "text" : "password")} className="password">{intype === "password" ? <AiFillEyeInvisible /> : <AiFillEye />}</span>

                <input type="file" id="profilePic" required />
                <label htmlFor="profilePic">
                    <FcImageFile style={{ fontSize: '2rem' }} />
                    Add an avatar
                </label>

                <button className={loading === true ? "submitButton loading" : "submitButton"} type="submit">Register</button>
                <p>have an account??<Link className="link" to="/Login"> Login </Link> </p>
                <p style={{ color: 'red' }}>{err && "something went wrong"}</p>
            </form>
        </>
    );

}
export default Register
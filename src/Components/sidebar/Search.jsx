import { useState, useContext } from "react";
import { db } from "../../Firebase"
import { AuthContext } from "../../context/AuthContext"
import { where, query, collection, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext"
const Search = () => {
    const { dispatch } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState("")
    const [err, setErr] = useState(false)


    async function handelSearch(e) {
        const q = query(collection(db, 'users'), where('displayName', '==', username))
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            })
        } catch (error) {
            setErr(true)
            console.log(error);
        }
    }

    function handelKey(e) {
        e.code === "Enter" && handelSearch();
    }

    async function handelSelect() {
        dispatch({ type: "CHANGE_USER", payload: user })
        const combinedId = currentUser.uid > user.uid ?
            currentUser.uid + user.uid :
            user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId))
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] })

                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }

        } catch (err) {
            console.log(err);
        }
        setUser(null)
        setUsername("")
    }
    return (
        <>
            <input value={username} onKeyDown={handelKey} onChange={(e) => setUsername(e.target.value)} type="search" placeholder="Find a user" className="search" />

            {err && <h3 className="errorMessage">user not find!!</h3>}
            {
                user &&
                <div className="searchResult" onClick={handelSelect}>
                    <img src={user.photoURL} alt="profileuser" />
                    <span>{user.displayName}</span>
                </div>
            }
        </>
    );
}
export default Search;
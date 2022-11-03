import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
import { db } from "../../Firebase";

const People = () => {
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const [chats, setChats] = useState([])

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    function handelSelect(u) {
        dispatch({ type: "CHANGE_USER", payload: u })
    }

    return (
        <>
            <div className="chats">
                {
                    chats &&
                    Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                        <div className="friend" key={chat[0]} onClick={() => handelSelect(chat[1].userInfo)}>
                            <img className="profilechats" src={chat[1].userInfo && chat[1].userInfo?.photoURL} alt="" />
                            <div className="chattext">
                                <h5>{chat[1].userInfo && chat[1].userInfo.displayName}</h5>
                            </div>
                        </div>
                    ))
                }

            </div>
        </>
    );
}

export default People;
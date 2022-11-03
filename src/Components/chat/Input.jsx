import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useState, useContext } from "react";
import { db, storage } from "../../Firebase"
import { AiOutlinePicture } from "react-icons/ai"
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Input = () => {
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    async function HandelSend() {
        if (img) {

            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL
                            })
                        })
                    });
                }
            );

        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
        setText('')
        setImg(null)
    }
    return (
        <>
            <div className="send">
                <input onKeyDown={(e) => e.code === "Enter" && HandelSend()} type="text" placeholder="Type something..." value={text} onChange={(e) => setText(e.target.value)} />
                <input style={{ display: 'none' }} type="file" id="file" onChange={(e) => setImg(e.target.files[0])} />
                <label htmlFor="file">
                    <span><AiOutlinePicture /></span>
                </label>
                <input onClick={HandelSend} type="submit" value="send" />
            </div>
        </>
    );
}

export default Input;
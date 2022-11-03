import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const ref = useRef()

    // useEffect(() => {
    //     ref.current?.scrollIntoView({ behavier: "smooth" })
    // }, [message])

    return (
        <>
            <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
                <div className="messageInfo">
                    <img alt="profilepic" src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} />
                    <span>just now</span>
                </div>
                <div className="messageContent">
                    <p>{message.text}</p>
                    {
                        message.img &&
                        <img style={{ height: '10rem', width: "70%" }} src={message.img} alt="message" />
                    }
                </div>
            </div>
        </>
    );
}

export default Message;
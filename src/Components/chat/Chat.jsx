import Messages from "../chat/Messages"
import Input from "../chat/Input"
import { BsCameraVideo, BsThreeDots } from "react-icons/bs"
import { FaUserPlus } from "react-icons/fa"
import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"


const Chat = () => {
    const { data } = useContext(ChatContext)
    return (
        <>
            <div className="navbarchat">
                <p style={{ fontFamily: 'centralBold' }}>{data.user?.displayName}</p>
                <div className="future">
                    <span><BsCameraVideo /></span>
                    <span><FaUserPlus /></span>
                    <span><BsThreeDots /></span>
                </div>
            </div>
            <Messages />
            <Input />
        </>
    );
}

export default Chat;
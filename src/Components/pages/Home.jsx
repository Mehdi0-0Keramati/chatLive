import Sidebar from "../sidebar/Sidebar"
import Chat from "../chat/Chat"

const Home = () => {
    return (
        <>
            <div className="container">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="chat">
                    <Chat />
                </div>
            </div>
        </>
    );
}

export default Home;
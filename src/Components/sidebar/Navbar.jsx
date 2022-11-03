import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

    const { currentUser } = useContext(AuthContext)

    return (
        <>
            <div className="navbar">
                <span className="appName">Live Chat</span>

                <img src={currentUser.photoURL} alt="profileNavbar" className="profileNavbar" />
                <span className="displayname">{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)} className="logout">
                    Logout
                </button>

            </div>
        </>
    );
}

export default Navbar;
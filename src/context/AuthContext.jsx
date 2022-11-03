import { useEffect, useState } from "react";
import { createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
export const AuthContext = createContext({})

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
        return (() => {
            unsub()
        })
    }, [])
    
    return (
        <AuthContext.Provider value={{ currentUser: currentUser }}>
            {children}
        </AuthContext.Provider >
    )
} 
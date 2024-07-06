import { createContext, useContext } from "react"


export const AuthContext=createContext();
const storetoken=(token)=>{
    return localStorage.setItem("token",token)
}
const removetoken=()=>{
    localStorage.removeItem("token");
    window.location.reload(true);
}
 export const AuthProvider=({children})=>{
    return <AuthContext.Provider value={{storetoken,removetoken}}>
        {children}
    </AuthContext.Provider>
}


export const useAuth=()=>{
    return useContext(AuthContext)
}
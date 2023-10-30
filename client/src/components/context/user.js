import {useState, useEffect, createContext} from 'react'

const UserContext = createContext()

function UserProvider({children}){
    const [user, setUser] = useState({
        id: 0,
        displayName: "",
        access_level: 0
    })

    useEffect(()=>{
        fetch('/me')
        .then(res => res.ok ? res.json() : {id: 0, displayName: "", access_level: 0})
        .then(user =>setUser(user))
    }, [])
    
    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}
import {useState, createContext} from 'react'

const UserContext = createContext()

function UserProvider({children}){
    const [user, setUser] = useState({
        id: 0,
        displayName: ""
    })
    
    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}
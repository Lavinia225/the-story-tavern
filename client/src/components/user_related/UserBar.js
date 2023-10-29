import { useContext } from "react"
import { UserContext } from "../context/user"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"

function UserBar(){
    const {user} = useContext(UserContext)
    
    return(
        <nav id='user-bar'>
            <NavLink to='/login'>Login</NavLink>
        </nav>
    )
}

export default UserBar
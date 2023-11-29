import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "./context/user"

function NavBar(){
    const {user} = useContext(UserContext)

    return (
        <nav id='navbar'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/stories'>Stories</NavLink>
            {user.access_level > 0 ? <NavLink to='/genres'>Genres</NavLink> : null}
        </nav>
    )
}

export default NavBar
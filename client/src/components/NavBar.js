import { NavLink } from "react-router-dom/cjs/react-router-dom.min"

function NavBar(){
    return (
        <nav id='navbar'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/stories'>Stories</NavLink>
        </nav>
    )
}

export default NavBar
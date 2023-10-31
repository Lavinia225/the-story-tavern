import { useContext } from "react"
import { UserContext } from "../context/user"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"

function UserBar(){
    const {user, setUser} = useContext(UserContext)

    function renderWelcomeLogout(){
        return(
            <>
                <p>Welcome, {user.display_name}</p>
                <div className='dropdown'>
                    <button>Profile</button>
                    <div className='dropdown-content'>
                        <a onClick={logout}>Logout</a>
                    </div>
                </div>
            </>
        )
    }

    function renderLoginCreateAccount(){
        return(
            <>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/signup'>Create Account</NavLink>
            </>)
    }

    function logout(){
        fetch('/logout', {method: "DELETE"})
        .then(setUser({id: 0, display_name: "", access_level: 0}))
    }
    
    return(
        <nav id='user-bar'>
            {user.id === 0 ? renderLoginCreateAccount() : renderWelcomeLogout()}
        </nav>
    )
}

export default UserBar
import { useContext } from "react"
import { useNavigate, NavLink } from "react-router-dom"
import { UserContext } from "../context/user"

function UserBar(){
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)

    function renderWelcomeLogout(){
        return(
            <>
                <p>Welcome, {user.display_name}</p>
                <div className='dropdown'>
                    <button>Profile</button>
                    <div className='dropdown-content'>
                        <a onClick={navigateToSettings}>Settings</a>
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
        navigate('/')
    }

    function navigateToSettings(){
        navigate('/user/settings')
    }
    
    return(
        <nav id='user-bar'>
            {user.id === 0 ? renderLoginCreateAccount() : renderWelcomeLogout()}
        </nav>
    )
}

export default UserBar
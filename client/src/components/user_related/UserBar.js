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
                        <a onClick={deleteAccount}>Delete Account</a>
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

    async function deleteAccount(){
        const confirmation = window.confirm("Are you completely sure? Accounts are not recoverable.")

        if(confirmation){
            const response = await fetch(`/users/${user.id}`, {method: "DELETE"})

            if (response.status == 204){
                setUser({id: 0, display_name: "", access_level: 0})
            }
            else{
                const data = response.json()
                window.alert("The following has gone horribly wrong: ", data.errors)
            }
        }
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
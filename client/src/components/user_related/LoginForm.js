import {useState, useContext} from 'react'
import {UserContext} from '../context/user'

function LoginForm(){
    const {setUser} = useContext(UserContext)
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return(
    <div>
        <form id='login-form'>
            <label htmlFor='username-field'>Username: </label>
            <input id='username-field' type='text' name='username' value={formData.username} onChange={handleChange} />
            <label htmlFor='password-field'>Password: </label>
            <input id='password-field' type='password' name='password' value={formData.password} onChange={handleChange} />
        </form>
    </div>
    )
}

export default LoginForm
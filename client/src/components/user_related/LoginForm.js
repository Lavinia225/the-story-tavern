import {useState, useContext} from 'react'
import {UserContext} from '../context/user'

function LoginForm(){
    const {user, setUser} = useContext(UserContext)
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    async function handleSubmit(e){
        e.preventDefault()

        //Remember to create error context and check for blank fields here

        const configObject = {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch('/login', configObject)
        const data = await response.json()

        if (response.ok){
            setUser(data)
        }
        else{
            console.log(response)
        }
    }

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return(
    <div>
        <form id='login-form' onSubmit={handleSubmit}>
            <label htmlFor='username-field'>Username: </label>
            <input id='username-field' type='text' name='username' value={formData.username} onChange={handleChange} />
            <label htmlFor='password-field'>Password: </label>
            <input id='password-field' type='password' name='password' value={formData.password} onChange={handleChange} />
            <button type='submit'>Submit</button>
        </form>
    </div>
    )
}

export default LoginForm
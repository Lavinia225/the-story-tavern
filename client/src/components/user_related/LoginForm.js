import {useState, useContext} from 'react'
import {UserContext} from '../context/user'
import {ErrorsContext} from '../context/errors'

function LoginForm(){
    const {user, setUser} = useContext(UserContext)
    const {errors, setErrors, displayErrors} = useContext(ErrorsContext)
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    console.log("User:", user)
    console.log("Errors:", errors)

    async function handleSubmit(e){
        e.preventDefault()

        if (formData.username.length < 1 || formData.password.length < 1) return setErrors(["Username or Password can not be blank."])

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
            setErrors([])
        }
        else{
            setErrors(data.errors)
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
        {displayErrors()}
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
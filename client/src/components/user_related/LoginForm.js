import {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../context/user'
import {ErrorsContext} from '../context/errors'

function LoginForm(){
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    const {setErrors, displayErrors} = useContext(ErrorsContext)
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    useEffect(()=>{setErrors([])}, [])

    async function handleSubmit(e){
        e.preventDefault()

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
            navigate('/')
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
            <input id='username-field' type='text' name='username' value={formData.username} onChange={handleChange} required/>
            <label htmlFor='password-field'>Password: </label>
            <input id='password-field' type='password' name='password' value={formData.password} onChange={handleChange} required/>
            <button type='submit'>Submit</button>
        </form>
    </div>
    )
}

export default LoginForm
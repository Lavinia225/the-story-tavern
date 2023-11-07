import {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { UserContext } from '../context/user'
import { ErrorsContext } from '../context/errors'

function SignupForm(){
    const history = useHistory()
    const {setUser} = useContext(UserContext)
    const {setErrors, displayErrors} = useContext(ErrorsContext)
    const [formData, setFormData] = useState({
        username: "",
        display_name: "",
        password: "",
        email: ""
    })

    async function handleSubmit(e){
        e.preventDefault()


        const configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch('/signup', configObject)
        const data = await response.json()

        if(response.ok){
            setUser(data)
            setErrors([])
            history.goBack()
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
        <div id='signup'>
            {displayErrors()}
            <form id='create-account' onSubmit={handleSubmit}>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username' value={formData.username} onChange={handleChange} required/>
                <label htmlFor='display_name'>Display Name: </label>
                <input type='text' name='display_name' value={formData.display_name} onChange={handleChange} required/>
                <label htmlFor='email'>Email: </label>
                <input type='text' name='email' value={formData.email} onChange={handleChange} required/>
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' value={formData.password} onChange={handleChange} required/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SignupForm
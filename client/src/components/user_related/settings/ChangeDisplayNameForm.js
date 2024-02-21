import {useState, useContext} from 'react'
import { UserContext } from '../../context/user'
import { ErrorsContext } from '../../context/errors'

function ChangeDisplayNameForm({hide, unhide}){
    const {setErrors} = useContext(ErrorsContext)
    const {user, setUser} = useContext(UserContext)
    const [formData, setFormData] = useState({
        display_name: "",
        password: ""
    })

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

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

        const response = await fetch('/change_display_name', configObject)
        const data = await response.json()

        if (response.ok){
            setUser({...user, display_name: data.display_name})
            setErrors([])
            unhide("changeDisplayNameForm")
        }
        else{
            setErrors(data.errors)
        }
    }
    console.log(user)

    return (
        <form className='settings-form' hidden={hide} onSubmit={handleSubmit}>
            <label htmlFor='display-name-field'>New Display Name: </label>
            <input id='display-name-field' type='text' name='display_name' value={formData.display_name} onChange={handleChange} required/>
            <label htmlFor='display-name-password'>Password: </label>
            <input id='display-name-password' type='password' name='password' value={formData.password} onChange={handleChange} required></input>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default ChangeDisplayNameForm
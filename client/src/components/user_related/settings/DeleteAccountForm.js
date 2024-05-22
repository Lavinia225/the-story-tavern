import {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/user'
import { ErrorsContext } from '../../context/errors'

function DeleteAccountForm({hide, unhide}){
    const {setErrors} = useContext(ErrorsContext)
    const {user, setUser} = useContext(UserContext)
    const [formData, setFormData] = useState({
        password: ""
    })
    const navigate = useNavigate()

    async function deleteAccount(e){
        e.preventDefault()
        const confirmation = window.confirm("Are you completely sure? Accounts are not recoverable.")

        if(confirmation){
            const configObject = {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            
            const response = await fetch(`/users/${user.id}`, configObject)


            if (response.status == 204){
                setUser({id: 0, display_name: "", access_level: 0})
                navigate('/')
            }
            else{
                const data = await response.json()
                setErrors(data.errors)
            }
        }
    }

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div id ='delete-account'>
            <h4 id='delete-account-warning' hidden={hide}>Once deleted, it's gone forever.</h4>
            <form className='settings-form' hidden={hide} onSubmit={deleteAccount}>
                <label htmlFor='delete-account-password'>Password: </label>
                <input id='delete-account-password' type='password' name='password' value={formData.password} onChange={handleChange} required></input>
                <button type='submit' id='delete-account-button'>Submit</button>
            </form>
        </div>
    )
}

export default DeleteAccountForm
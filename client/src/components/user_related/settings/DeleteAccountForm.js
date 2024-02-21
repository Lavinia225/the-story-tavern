import {useState, useContext} from 'react'
import { UserContext } from '../../context/user'
import { ErrorsContext } from '../../context/errors'

function DeleteAccountForm({hide, unhide}){
    const {setErrors} = useContext(ErrorsContext)
    const {user, setUser} = useContext(UserContext)
    const [formData, setFormData] = useState({
        password: ""
    })

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div id ='delete-account'>
            <h4 id='delete-account-warning' hidden={hide}>Once deleted, it's gone forever.</h4>
            <form className='settings-form' hidden={hide}>
                <label htmlFor='delete-account-password'>Password: </label>
                <input id='delete-account-password' type='password' name='password' value={formData.password} onChange={handleChange} required></input>
                <button type='submit' id='delete-account-button'>Submit</button>
            </form>
        </div>
    )
}

export default DeleteAccountForm
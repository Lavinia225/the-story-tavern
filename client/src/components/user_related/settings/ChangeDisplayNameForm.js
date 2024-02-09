import {useState} from 'react'

function ChangeDisplayNameForm({hide}){
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

    return (
        <form className='settings-form' hidden={hide}>
            <label htmlFor='display-name-field'>New Display Name: </label>
            <input id='display-name-field' type='text' name='display_name' value={formData.display_name} onChange={handleChange} required/>
            <label htmlFor='display-name-password'>Password: </label>
            <input id='display-name-password' type='password' name='password' value={formData.password} onChange={handleChange} required></input>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default ChangeDisplayNameForm
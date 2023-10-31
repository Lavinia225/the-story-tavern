import {useState} from 'react'

function SignupForm(){
    const [formData, setFormData] = useState({
        username: "",
        display_name: "",
        password: "",
        email: ""
    })

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div id='signup'>
            <form id='create-account'>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username' value={formData.username} onChange={handleChange}/>
                <label htmlFor='display_name'>Display Name: </label>
                <input type='text' name='display_name' value={formData.display_name} onChange={handleChange}/>
                <label htmlFor='email'>Email: </label>
                <input type='text' name='email' value={formData.email} onChange={handleChange}/>
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' value={formData.password} onChange={handleChange}/>
            </form>
        </div>
    )
}

export default SignupForm
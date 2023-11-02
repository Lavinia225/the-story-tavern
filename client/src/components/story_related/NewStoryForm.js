import {useState, useContext} from 'react'

function NewStoryForm(){
    const [formData, setFormData] = useState({
        title: "",
        body: ""
    })

    function handleChange(e){
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    return(
    <div>
        <form id='new-story'>
            <label htmlFor='title'>Title: </label>
            <input type='text' id='title' onChange={handleChange} value={formData.title} />
            <label htmlFor='body'>Body: </label>
            <input type='textarea' id='body' onChange={handleChange} value={formData.body} />
        </form>
    </div>
    )
}

export default NewStoryForm
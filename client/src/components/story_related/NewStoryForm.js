import {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { ErrorsContext } from '../context/errors'
import GenreSelector from './GenreSelector'

function NewStoryForm(){
    const history = useHistory()
    const {setErrors, displayErrors} = useContext(ErrorsContext)
    const [formData, setFormData] = useState({
        title: "",
        body: ""
    })

    async function handleSubmit(e){
        e.preventDefault()
        const selectedGenres = []

        findSelectedGenres()
        
        const configObject = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({...formData, genres: selectedGenres})
        }

        const response = await fetch('/stories', configObject)
        const data = await response.json()

        if (response.ok){
            history.push(`/stories/${data.id}`)
        }
        else{
            setErrors(data.errors)
        }

        function findSelectedGenres(){
            const selectElement = e.target[0]
            for(let i = 0; i < selectElement.length; i++){
                if(selectElement[i].selected === true){
                    selectedGenres.push(parseInt(selectElement[i].value))
                }
            }
        }
    }

    function handleChange(e){
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    return(
    <div>
        {displayErrors()}
        <GenreSelector/>
        <form id='new-story' onSubmit={handleSubmit}>
            <label htmlFor='title'>Title: </label>
            <input type='text' id='title' onChange={handleChange} value={formData.title} required/>
            <label htmlFor='body'>Body: </label>
            <input type='textarea' id='body' onChange={handleChange} value={formData.body} required/>
            <button type='submit'>Submit</button>
        </form>
    </div>
    )
}

export default NewStoryForm
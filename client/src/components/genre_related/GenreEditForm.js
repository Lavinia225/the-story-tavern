import {useState, useContext} from 'react'
import { ErrorsContext } from "../context/errors"

function GenreEditForm({genre, updateGenreState, handleCancel}){
    const {setErrors} = useContext(ErrorsContext)
    const [formData, setFormData] = useState(genre.genre)

    async function handleSubmit(e){
        e.preventDefault()

        const configObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({genre: formData})
        }

        const response = await fetch(`/genres/${genre.id}`, configObject)
        const data = await response.json()

        if (response.ok){
            updateGenreState(data)
        }
        else{
            setErrors(data.errors)
        }
    }

    function handleChange(e){
        setFormData(e.target.value)
    }

    return(
        <form id='genre-edit-form' onSubmit={handleSubmit}>
            <label htmlFor="genre">Genre: </label>
            <input type='text' onChange={handleChange} value={formData} required/>
            <button type='submit'>Submit</button>
            <button onClick={handleCancel}>Cancel Editing</button>
        </form>
    )
}

export default GenreEditForm
import {useState, useContext} from 'react'
import { GenresContext } from '../context/genres'
import { ErrorsContext } from '../context/errors'

function NewGenreForm({handleCreateChange}){
    const {genres, setGenres} = useContext(GenresContext)
    const {setErrors} = useContext(ErrorsContext)
    const [formData, setFormData] = useState("")

    function handleChange(e){
        setFormData(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()

        const configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({genre: formData})
        }

        const response = await fetch('/genres', configObject)
        const data = await response.json()

        if (response.ok){
            setGenres([...genres, data])
            setErrors([])
            handleCreateChange()
        }
        else{
            setErrors(data.errors)
        }
    }

    return (
        <form id='newgenreform' onSubmit={handleSubmit}>
            <label htmlFor="genre">Genre: </label>
            <input type='text' onChange={handleChange} value={formData} required/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default NewGenreForm
import {useState, useEffect, useContext} from 'react'
import { ErrorsContext } from '../context/errors'
import GenreSelector from './GenreSelector'

function NewStoryForm(){
    const [genres, setGenres] = useState([])
    const {setErrors, displayErrors} = useContext(ErrorsContext)
    const [formData, setFormData] = useState({
        title: "",
        body: ""
    })

    useEffect(()=>{
        fetchGenres()

        async function fetchGenres(){
            const res = await fetch('/genres')
            const data = await res.json()
            
            if (res.ok){
                setGenres(data)
            }
            else{
                setErrors(data.errors)
            }
        }
    }, [])

    function handleSubmit(e){
        e.preventDefault()
        const selectedGenres = []

        findSelectedGenres()
        

        function findSelectedGenres(){
            const selectElement = e.target[0]
            for(let i = 0; i < selectElement.length; i++){
                if(selectElement[i].selected === true){
                    selectedGenres.push(selectElement[i].value)
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
        <GenreSelector genres={genres}/>
        <form id='new-story' onSubmit={handleSubmit}>
            <label htmlFor='title'>Title: </label>
            <input type='text' id='title' onChange={handleChange} value={formData.title} />
            <label htmlFor='body'>Body: </label>
            <input type='textarea' id='body' onChange={handleChange} value={formData.body} />
            <button type='submit'>Submit</button>
        </form>
    </div>
    )
}

export default NewStoryForm
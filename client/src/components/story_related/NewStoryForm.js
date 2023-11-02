import {useState, useEffect, useContext} from 'react'
import { ErrorsContext } from '../context/errors'

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

    function handleChange(e){
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    return(
    <div>
        {displayErrors()}
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
import {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { ErrorsContext } from '../context/errors'
import { UserContext } from '../context/user'
import GenreSelector from './GenreSelector'

function EditStoryForm({story, updateStoryState}){
    const history = useHistory()
    const {user} = useContext(UserContext)
    const {setErrors} = useContext(ErrorsContext)
    const [formData, setFormData] = useState({
        title: story.title,
        body: story.body
    })

    async function handleSubmit(e){
        e.preventDefault()

        const selectedGenres = []

        findSelectedGenres()

        const configObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({...formData, genres: selectedGenres})
        }

        const res = await fetch(`/stories/${story.id}`, configObject)
        const data = await res.json()

        if (res.ok){
            updateStoryState(data)
            history.goBack()
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

    if (user.id !== story.user_id) return <h2 style={{color: 'purple', textAlign: "center"}}>You are not authorized to be here.</h2>

    return(
        <div id='story-edit-form'>
            <GenreSelector />
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

export default EditStoryForm
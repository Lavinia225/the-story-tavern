import {useState, useEffect, useContext} from 'react'
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { GenresContext } from '../context/genres'
import { ErrorsContext } from '../context/errors'

function GenrePage(){
    const params = useParams()
    const history = useHistory()
    const {genres, setGenres} = useContext(GenresContext)
    const {setErrors, displayErrors} = useContext(ErrorsContext)
    const [genre, setGenre] = useState({genre: "", id: 0})
    const [editing, setEditing] = useState(false)

    useEffect(()=>{
        if (genres.length > 0){
            const targetGenre = genres.find(genre =>genre.id === parseInt(params.id))
            if (targetGenre){
                setGenre(targetGenre)
            }
        }
    }, [genres])

    async function handleDelete(){
        const confirmation = window.confirm("Are you certain?")

        if (confirmation){
            const response = await fetch(`/genres/${genre.id}`, {method: "DELETE"})

            if (response.ok){
                setGenres(genres.filter(oldGenre => oldGenre.id !== genre.id))
                history.goBack()
            }
            else{
                const data = await response.json()
                setErrors(data.errors)
            }
        }
    }

    return(
        <div id='genrepage'>
            {displayErrors()}
            <p>{genre.genre}</p>
            <button>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default GenrePage
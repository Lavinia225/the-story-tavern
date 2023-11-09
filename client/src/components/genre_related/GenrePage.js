import {useState, useEffect, useContext} from 'react'
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { GenresContext } from '../context/genres'
import { UserContext } from '../context/user'
import { ErrorsContext } from '../context/errors'
import GenreEditForm from './GenreEditForm'

function GenrePage(){
    const params = useParams()
    const history = useHistory()
    const {genres, setGenres} = useContext(GenresContext)
    const {user} = useContext(UserContext)
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

    function updateGenreState(data){
        setGenre(data)
        setEditing(false)
        setGenres(genres.map(genre =>{
            if (genre.id === data.id){
                return data
            }
            else{
                return genre
            }
        }))
    }

    function handleEditClick(){
        setEditing(!editing)
    }

    if (user.access_level < 1) return <h2 style={{color: 'purple', textAlign: "center"}}>You are not authorized to be here.</h2>

    return(
        <div id='genrepage'>
            {displayErrors()}
            {editing ? <GenreEditForm genre={genre} updateGenreState={updateGenreState} handleCancel={handleEditClick}/>: 
                <div>
                    <p>{genre.genre}</p>
                    <button onClick={handleEditClick}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            }
        </div>
    )
}

export default GenrePage
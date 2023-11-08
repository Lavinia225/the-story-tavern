import {useState, useEffect, useContext} from 'react'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { GenresContext } from '../context/genres'
import { ErrorsContext } from '../context/errors'

function GenrePage(){
    const params = useParams()
    const {genres} = useContext(GenresContext)
    const {setErrors, displayErrors} = useContext(ErrorsContext)
    const [genre, setGenre] = useState("")
    const [editing, setEditing] = useState(false)
    const [initialRender, setInitialRender] = useState(true)

    useEffect(()=>{
        if (!initialRender){
            const targetGenre = genres.find(genre =>genre.id === parseInt(params.id)).genre
            setGenre(targetGenre)
        }
        setInitialRender(false)
    }, [genres])

    return(
        <div>
            <p>{genre}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}

export default GenrePage
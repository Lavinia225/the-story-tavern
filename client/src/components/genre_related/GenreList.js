import { useContext, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import { UserContext } from "../context/user"
import { GenresContext } from "../context/genres"
import { ErrorsContext } from "../context/errors"
import NewGenreHandler from './NewGenreHandler'

function GenreList(){
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const {genres} = useContext(GenresContext)
    const {displayErrors, setErrors} = useContext(ErrorsContext)

    useEffect(()=>{setErrors([])}, [])

    if (user.access_level < 1) return <h2 style={{color: 'purple', textAlign: "center"}}>You are not authorized to be here.</h2>

    function handleRedirect(id){
        navigate(`/genres/${String(id)}`)
    }
        
    return(
        <div id='genrelist'>
            {displayErrors()}
            <NewGenreHandler />
            <ul>
                {genres.map(genre => <li key={Math.random()} onClick={()=>handleRedirect(genre.id)}>{genre.genre}</li>)}
            </ul>
        </div>
    )
}

export default GenreList
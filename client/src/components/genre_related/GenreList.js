import { useContext } from "react"
import { UserContext } from "../context/user"
import { GenresContext } from "../context/genres"
import { ErrorsContext } from "../context/errors"

function GenreList(){
    const {user} = useContext(UserContext)
    const {genres, setGenres} = useContext(GenresContext)
    const {displayErrors} = useContext(ErrorsContext)

    if (user.access_level < 1) return <h2 style={{color: 'purple', textAlign: "center"}}>You are not authorized to be here.</h2>
        
    return(
        <div id='genrelist'>
            {displayErrors()}
            <ul>
                {genres.map(genre => <li key={Math.random()}>{genre.genre}</li>)}
            </ul>
        </div>
    )
}

export default GenreList
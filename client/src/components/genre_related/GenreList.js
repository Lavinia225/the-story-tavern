import { useContext } from "react"
import { UserContext } from "../context/user"
import { GenresContext } from "../context/genres"

function GenreList(){
    const {user} = useContext(UserContext)
    const {genres} = useContext(GenresContext)

    if (user.access_level < 1) return <h2 style={{color: 'purple', textAlign: "center"}}>You are not authorized to be here.</h2>
        
    return(
        <div id='genrelist'>
            <p>OH HI!</p>
            {genres.map(genre => <p>{genre.genre}</p>)}
        </div>
    )
}

export default GenreList
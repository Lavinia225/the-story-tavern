import { useContext } from "react"
import { UserContext } from "../context/user"

function GenreList(){
    const {user} = useContext(UserContext)

    if (user.access_level < 1) return <h2 style={{color: 'purple', textAlign: "center"}}>You are not authorized to be here.</h2>
        
    return(
        <p>OH HI!</p>
    )
}

export default GenreList
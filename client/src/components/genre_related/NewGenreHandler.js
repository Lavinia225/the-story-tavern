import {useState} from 'react'
import NewGenreForm from './NewGenreForm'

function NewGenre(){
    const [creating, setCreating] = useState(false)

    function  handleCreateChange(){
        setCreating(!creating)
    }
    return(
        <div id='newgenre'>
            {creating ? <NewGenreForm handleCreateChange={handleCreateChange}/> : <button onClick={handleCreateChange}>Create Genre</button>}
        </div>
    )
}

export default NewGenre
import {useContext} from 'react'
import { GenresContext } from '../context/genres'

function GenreSelector({activeGenres}){
    const {genres} = useContext(GenresContext)
    
    function checkIfActive(genre){
        if(activeGenres){
            return !!activeGenres.find(oldGenre => oldGenre === genre)
        }
        else{
            return false
        }
    }

    return(
        <div id='new-story-select'>
            <label htmlFor="new-story-select">{'Select one or more genres (ctrl click to multiselect)'}: </label>
            <select id='new-story-select' name='genres' multiple={true} form='new-story' required>
                {genres.map(genre => <option key={genre.genre} value={genre.id} selected={checkIfActive(genre.genre)}>{genre.genre}</option>)}
            </select>
        </div>
    )
}

export default GenreSelector
import {useContext} from 'react'
import { GenresContext } from '../context/genres'

function GenreSelector(){
    const {genres} = useContext(GenresContext)

    return(
        <div id='new-story-select'>
            <label htmlFor="new-story-select">{'Select one or more genres (ctrl click to multiselect)'}: </label>
            <select id='new-story-select' name='genres' multiple={true} form='new-story'>
                {genres.map(genre => <option key={genre.genre} value={genre.id}>{genre.genre}</option>)}
            </select>
        </div>
    )
}

export default GenreSelector
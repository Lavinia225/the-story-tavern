function GenreSelector({genres}){
    return(
        <div id='new-story-select'>
            <label htmlFor="new-story-select">{'Select one or more genres (shift click to multiselect)'}: </label>
            <select id='new-story-select' name='genres' multiple={true} form='new-story'>
                {genres.map(genre => <option key={genre.genre} value={genre.id}>{genre.genre}</option>)}
            </select>
        </div>
    )
}

export default GenreSelector
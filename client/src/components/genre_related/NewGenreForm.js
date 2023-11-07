function NewGenreForm({handleCreateChange}){
    return (
        <form id='newgenreform'>
            <label htmlFor="genre">Genre: </label>
            <input type='text' />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default NewGenreForm
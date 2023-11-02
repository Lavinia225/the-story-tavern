function StoryPreview({story}){
    return(
        <tr id='story-preview'>
            <td>
                <p id='story-preview-title'>{story.title}<br/>
                    <span id='story-preview-user'>By: {story.user}</span>
                </p>
                <p id='story-preview-summary'>{story.summary}</p>
            </td>
            <td>
                <ul>
                    {story.genres.map(genre => <li>{genre.genre}</li>)}
                </ul>
            </td>
            <td>{story.formatted_updated_at}</td>
        </tr>
    )
}

export default StoryPreview
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function StoryPreview({story}){
    const history = useHistory()

    function handleClick(){
        history.push(`stories/${story.id}`)
    }

    return(
        <tr id='story-preview'>
            <td>
                <p id='story-preview-title'><span onClick={handleClick}>📖</span>{story.title}<br/>
                    <span id='story-preview-user'>By: {story.creator}</span>
                </p>
                <p id='story-preview-summary'>{story.summary}</p>
            </td>
            <td>
                <ul>
                    {story.genres.map(genre => <li key={Math.random()}>{genre.genre}</li>)}
                </ul>
            </td>
            <td>{story.formatted_updated_at}</td>
        </tr>
    )
}

export default StoryPreview
import {useState, useEffect, useContext} from 'react'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { UserContext } from '../context/user'
import { ErrorsContext } from '../context/errors'
import EmoteBar from './EmoteBar'

function Story(){
    const params = useParams()
    const history= useHistory()
    const {user} = useContext(UserContext)
    const {setErrors, displayErrors} = useContext(ErrorsContext)
    const [story, setStory] = useState({})

    useEffect(()=>{
        fetchStory()

        async function fetchStory(){
            const response = await fetch(`/stories/${params.id}`)
            const data = await response.json()

            if (response.ok){
                setStory(data)
            }
            else{
                setErrors(data.errors)
            }
        }
    }, [])

    function genreStringer(){
        let genreString = "Genres: "
        story.genres.forEach(genre =>{
            genreString += `${genre.genre}, `
        })
        
        return genreString.slice(0, genreString.length - 2)
    }

    async function handleDelete(){
        const confirmation = window.confirm("Are you confident in this irreversible action?")

        if (confirmation){
            const res = await fetch(`/stories/${story.id}`, {method: "DELETE"})

            if (res.ok){
                history.push('/stories')
            }
            else{
                const data = await res.json()
                setErrors(data.errors)
            }
        }
    }

    function deletePrivilages(){
        return user.id === story.user_id || user.access_level > 0
    }

    if (Object.keys(story).length < 1){
        return (
            <>
                {displayErrors()}
                <p>Loading</p>
            </>)
    }

    return(
        <div id='story'>
            {displayErrors()}
            <h2>{story.title}
                {deletePrivilages() ?
                 <span>
                    {user.id === story.user_id ? <button>Edit</button> : null}
                    <button onClick={handleDelete}>Delete</button>
                 </span>
                : null}
            </h2>
            <p id='story-author'>By: {story.creator}</p>
            {story.genres.length > 0 ? <p>{genreStringer()}</p> : null}
            <p id='story-body'>{story.body}</p>
            {/*<EmoteBar emotes={story.emotes} storyId={story.id}/>*/}
        </div>
    )
}

export default Story
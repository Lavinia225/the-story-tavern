import {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { UserContext } from '../context/user'
import { ErrorsContext } from '../context/errors'
import EmoteBar from './EmoteBar'

function Story(){
    const params = useParams()
    const {user} = useContext(UserContext) //For checking if edit/deleting is allowed
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

    if (Object.keys(story).length < 1){
        return <p>Loading</p>
    }

    return(
        <div id='story'>
            {displayErrors()}
            <h2>{story.title}</h2>
            <p id='story-author'>By: {story.user}</p>
            {story.genres.length > 0 ? <p>{genreStringer()}</p> : null}
            <p id='story-body'>{story.body}</p>
            <EmoteBar emotes={story.emotes}/>
        </div>
    )
}

export default Story
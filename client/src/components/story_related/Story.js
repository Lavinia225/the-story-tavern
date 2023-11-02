import {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { UserContext } from '../context/user'
import { ErrorsContext } from '../context/errors'

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

    return(
        <div id='story'>
            {displayErrors()}
            <h2>{story.title}</h2>
            <p id='story-author'>By: {story.user}</p>
            <p id='story-body'>{story.body}</p>
        </div>
    )
}

export default Story

//story = id, title, user, body, emotes[], genres[]
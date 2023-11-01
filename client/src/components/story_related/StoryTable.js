import {useState, useEffect, useContext} from 'react'
import { ErrorsContext } from "../context/errors"

function StoryTable(){
    const {setErrors, displayErrors} = useContext(ErrorsContext)
    const [stories, setStories] = useState([])

    useEffect(()=>{
        getStories()

        async function getStories(){
            const response = await fetch('/stories')
            const data = await response.json()

            if (response.ok){
                setStories(data)
            }
            else{
                setErrors(data.errors)
            }
        }
    }, [])

    console.log(stories)

    return(
        <div id='stories'>
            <p>Test</p>
            {displayErrors()}
            {stories.length > 0 ? stories.map(story => <p>{story.summary}</p>): null}
        </div>
    )
}

export default StoryTable
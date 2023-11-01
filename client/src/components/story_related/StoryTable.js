import {useState, useEffect, useContext} from 'react'
import { ErrorsContext } from "../context/errors"
import StoryPreview from './StoryPreview'

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

    return(
        <div id='stories'>
            {displayErrors()}
            <table>
                <tbody>
                    <tr>
                        <th>Stories</th>
                        <th>Genres</th>
                        <th>Last Edited</th>
                    </tr>
                    {stories.map(story => <StoryPreview key={story.id} story={story}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default StoryTable
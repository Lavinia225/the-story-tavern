import {useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { ErrorsContext } from "../context/errors"
import { UserContext } from '../context/user'
import StoryPreview from './StoryPreview'

function StoryTable(){
    const history = useHistory()
    const {user} = useContext(UserContext)
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

    function handleRedirect(){
        history.push('/stories/new')
    }

    return(
        <div id='stories'>
            {displayErrors()}
            {user.id !== 0 ? <button id='create-stories-button' onClick={handleRedirect}>Create Story</button> : null}
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
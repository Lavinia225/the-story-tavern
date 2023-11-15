import {useState, useEffect, useContext} from 'react'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { ErrorsContext } from "../context/errors"
import { UserContext } from '../context/user'
import StoryPreview from './StoryPreview'

function StoryTable(){
    const history = useHistory()
    let {search} = useLocation()
    const {user} = useContext(UserContext)
    const {setErrors, displayErrors} = useContext(ErrorsContext)
    const [stories, setStories] = useState([])

    useEffect(()=>{
        getStories(currentPage())
    }, [])

    async function getStories(page){
        const response = await fetch(`/stories?page=${page}`)
        const data = await response.json()

        if (response.ok){
            setStories(data)
        }
        else{
            setErrors(data.errors)
        }
    }

    function goToPreviousPage(){
        history.push(`/stories?page=${currentPage() - 1}`)
        getStories(currentPage() - 1)
    }

    function goToNextPage(){
        history.push(`/stories?page=${currentPage() + 1}`)
        getStories(currentPage() + 1)
    }

    function currentPage(){
        const page = parseInt(search.slice(6))
        if (!page || page === 1){
            return 1
        }
        else{
            return page
        }
    }

    function handleRedirect(){
        history.push('/stories/new')
    }

    return(
        <div id='stories'>
            {displayErrors()}
            <div id='button-container'>
                {currentPage() !== 1 ? <button onClick={goToPreviousPage}>Previous Page</button> : null}
                <button onClick={goToNextPage}>Next Page</button>
                {user.id !== 0 ? <button id='create-stories-button' onClick={handleRedirect}>Create Story</button> : null}
            </div>
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
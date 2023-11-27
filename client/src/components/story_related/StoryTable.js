import {useState, useEffect, useContext} from 'react'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { ErrorsContext } from "../context/errors"
import { UserContext } from '../context/user'
import StoryPreview from './StoryPreview'

function StoryTable(){
    const history = useHistory()
    let {search} = useLocation()
    const {user} = useContext(UserContext)
    const {errors, setErrors, displayErrors} = useContext(ErrorsContext)
    const [stories, setStories] = useState([])

    useEffect(()=>{
        getStories(currentPage())
        setErrors([])
    }, [currentPage()])

    async function getStories(page){
        const response = await fetch(`/stories?page=${page}`)
        const data = await response.json()

        if (response.ok){
            setStories(data)
            setErrors([])
        }
        else{
            setErrors(data.errors)
        }
    }

    function goToPreviousPage(){
        history.push(`/stories?page=${currentPage() - 1}`)
        //getStories(currentPage() - 1)
    }

    function goToNextPage(){
        if(errors.find(error => error === "There are no stories on this page or any afterwards.")){
            return
        }
        else{
            history.push(`/stories?page=${currentPage() + 1}`)
           // getStories(currentPage() + 1)
        }
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
            <div>
                <p>Click the little book icon or story title/author to read</p>
                <div id='button-container'>
                    {currentPage() !== 1 ? <button onClick={goToPreviousPage}>Previous Page</button> : null}
                    <button onClick={goToNextPage}>Next Page</button>
                    {user.id !== 0 ? <button id='create-stories-button' onClick={handleRedirect}>Create Story</button> : null}
                </div>
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
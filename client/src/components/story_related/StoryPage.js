import {useState, useEffect, useContext} from 'react'
import {useParams, Routes, Route} from 'react-router-dom'
import { ErrorsContext } from '../context/errors'
import Story from './Story'
import EditStoryForm from './EditStoryForm'

function StoryPage(){
    const params = useParams()
    const {setErrors, displayErrors} = useContext(ErrorsContext)
    const [story, setStory] = useState({})

    useEffect(()=>{
        fetchStory()

        async function fetchStory(){
            const response = await fetch(`/stories/${params.id}`)
            const data = await response.json()

            if (response.ok){
                setStory(data)
                setErrors([])
            }
            else{
                setErrors(data.errors)
            }
        }
    }, [])

    function updateStoryEmotes(data, posting){
        let newEmotes;

        if(posting){
            newEmotes = [...story.emotes, data]
        }
        else{
            newEmotes = story.emotes.map(updateEmote)
        }
        
        setStory({...story, emotes: newEmotes})

        function updateEmote(emote){
            if (emote.id === data.id){
                return data
            }
            else{
                return emote
            }
        }
    }

    function updateStoryState(data){
        setStory(data)
    }

    if (Object.keys(story).length < 1){
        return (
            <>
                {displayErrors()}
                <p>Loading</p>
            </>)
    }

    return(
        <div>
            {displayErrors()}
            <Routes>
                <Route path='/edit' element={<EditStoryForm story={story} updateStoryState={updateStoryState}/>}/>
                <Route path='/' element={<Story story={story} updateEmotes={updateStoryEmotes}/>}/>
            </Routes>
        </div>
    )
}

export default StoryPage
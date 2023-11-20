import {useState, useEffect, useContext} from 'react'
import {useParams, Switch, Route} from 'react-router-dom'
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
            <Switch>
                <Route path='/stories/:id/edit'>
                    <EditStoryForm story={story} updateStoryState={updateStoryState}/>
                </Route>
                <Route path='/stories/:id'>
                    <Story story={story} updateEmotes={updateStoryEmotes}/>
                </Route>
            </Switch>
        </div>
    )
}

export default StoryPage
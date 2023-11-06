import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/user"
import { ErrorsContext } from "../context/errors"

function EmoteBar({emotes, storyId}){
    const {user} = useContext(UserContext)
    const {setErrors} = useContext(ErrorsContext)
    const [loaded, setLoaded] = useState(false)
    const [emoteMap, setEmoteMap] = useState({
        happy: 0,
        sad: 0,
        mad : 0,
        heart: 0
    })
    const [userEmoteIndex, setUserEmoteIndex] = useState(-1)

    useEffect(()=>{
        Array.prototype.indexOfObject = function (param){
            for (let i = 0; i < this.length; i++){
                if (typeof param === 'function'){
                    if(param(this[i])) return i-1
                }
                else{
                    if (this[i] === param) return i-1
                }
            }
            return -1
        }
        if (!loaded){
            populateEmoteMap()
            setLoaded(true)
        }
    }, [])

    useEffect(()=>{
        const emoteIndex = emotes.indexOfObject(emote =>{
            const a = emote.user_id === user.id
            debugger
            return emote.user_id === user.id
        })
    
        if (emoteIndex !== -1){
            setUserEmoteIndex(emoteIndex)
        }
        else{
            emotes.push({
                user_id: user.id,
                story_id: storyId,
                happy: false,
                sad: false,
                mad: false,
                heart: false
            })
            setUserEmoteIndex(()=>emotes.length - 1)
        }
    }, [user])

    function populateEmoteMap(){
        const tempEmoteMap = {happy: 0, sad: 0, mad: 0, heart: 0}

        for(let i = 0; i < emotes.length; i++){
            const {happy, sad, mad, heart} = emotes[i]

            if (happy === true) tempEmoteMap.happy += 1
            if (sad === true) tempEmoteMap.sad += 1
            if (mad === true) tempEmoteMap.mad += 1
            if (heart === true) tempEmoteMap.heart += 1
        }
        setEmoteMap(tempEmoteMap)
    }

    async function handleClick(e){
       // Change to to emote[whatever] = whatever
        emotes.map(emote =>{
            if (emote.user_id === user.id){
                return {...emote, [e.target.name]: !emote[e.target.name]}
            }
            else{
                return emote
            }
        })
        console.log(emotes)
    }
    if (!loaded) return <p>Loading...</p>

    return(
        <div className='emotebar'>
            <button className={emotes[userEmoteIndex].happy === true ? "selected" : "deselected"} name="happy" onClick={handleClick}>😀 {emoteMap.happy}</button>
            <button className={emotes[userEmoteIndex].sad === true ? "selected" : "deselected"} name="sad" onClick={handleClick}>😢 {emoteMap.sad}</button>
            <button className={emotes[userEmoteIndex].mad === true ? "selected" : "deselected"} name="mad" onClick={handleClick}>😠 {emoteMap.mad}</button>
            <button className={emotes[userEmoteIndex].heart === true ? "selected" : "deselected"} name="heart" onClick={handleClick}>❤️ {emoteMap.heart}</button>
        </div>
    )
}

export default EmoteBar
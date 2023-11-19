import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/user"
import { ErrorsContext } from "../context/errors"

function EmoteBar({emotes, storyId, updateEmotes}){
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
        if (!loaded){
            populateEmoteMap()
            setLoaded(true)
        }
    })

    useEffect(()=>{
        Array.prototype.indexOfObject = function (param){
            for (let i = 0; i < this.length; i++){
                if (typeof param === 'function'){
                    if(param(this[i])) return i
                }
                else{
                    if (this[i] === param) return i
                }
            }
            return -1
        }

        if (user.id !== 0){
            const emoteIndex = emotes.indexOfObject(emote =>{
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
                    heart: false,
                    artificial: true
                })
                setUserEmoteIndex(()=>emotes.length - 1)
            }
        }
    }
    , [user])

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

    function checkUserMood(mood){
        if (userEmoteIndex !== -1){
            return emotes[userEmoteIndex][mood]
        }
        else{
            return false
        }
    }

    async function handleClick(e){ 
        if (user.id === 0){
            setErrors(["You must be logged in to use this."])
        }

        const emote = {...emotes[userEmoteIndex], [e.target.name]: !emotes[userEmoteIndex][e.target.name]}
        let url = '/emotes'

        if (!emote.artificial) url += `/${emote.id}`

        const configObject = {
            method: emote.artificial ? "POST" : "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(emote)
        }

        const response = await fetch(url, configObject)
        const data = await response.json()

        if(response.ok){
            updateEmotes(data, !!emote.artificial)
            setLoaded(false)
        }
        else{
            setErrors(data.errors)
        }
    }

    if (!loaded) return <p>Loading...</p>
console.log("In Emotebar", emotes)
    return(
        <div className='emotebar'>
            <button className={checkUserMood("happy") ? "selected" : "deselected"} name="happy" onClick={handleClick}>😀 {emoteMap.happy}</button>
            <button className={checkUserMood("sad") ? "selected" : "deselected"} name="sad" onClick={handleClick}>😢 {emoteMap.sad}</button>
            <button className={checkUserMood("mad") ? "selected" : "deselected"} name="mad" onClick={handleClick}>😠 {emoteMap.mad}</button>
            <button className={checkUserMood("heart") ? "selected" : "deselected"} name="heart" onClick={handleClick}>❤️ {emoteMap.heart}</button>
        </div>
    )
}

export default EmoteBar
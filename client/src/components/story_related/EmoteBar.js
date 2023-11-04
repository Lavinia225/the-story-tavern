import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/user"
import { ErrorsContext } from "../context/errors"

function EmoteBar({emotes}){
    const {user} = useContext(UserContext)
    const {setErrors} = useContext(ErrorsContext)
    const [loaded, setLoaded] = useState(false)
    const [emoteMap, setEmoteMap] = useState({
        happy: 0,
        sad: 0,
        mad : 0,
        heart: 0
    })
    const [userEmote, setUserEmote] = useState({
        happy: false,
        sad: false,
        mad: false,
        heart: false
    })

    useEffect(()=>{
        if (!loaded){
            populateEmoteMap()
        }
        if (emotes.find(emote =>emote.user_id === user.id)){
            console.log("clear!")
        }

        function populateEmoteMap(){
            const tempEmoteMap = {...emoteMap}

            for(let i = 0; i < emotes.length; i++){
                const {happy, sad, mad, heart} = emotes[i]

                if (happy === true) tempEmoteMap.happy += 1
                if (sad === true) tempEmoteMap.sad += 1
                if (mad === true) tempEmoteMap.mad += 1
                if (heart === true) tempEmoteMap.heart += 1
            }
            setEmoteMap(tempEmoteMap)
            setLoaded(true)
        }
    }, [])

    return(
        <div>
            <p className={userEmote.happy === true ? "active" : "inactive"}>😀 {emoteMap.happy}</p>
            <p className={userEmote.sad === true ? "active" : "inactive"}>😢 {emoteMap.sad}</p>
            <p className={userEmote.mad === true ? "active" : "inactive"}>😠 {emoteMap.mad}</p>
            <p className={userEmote.heart === true ? "active" : "inactive"}>❤️ {emoteMap.heart}</p>
        </div>
    )
}

export default EmoteBar
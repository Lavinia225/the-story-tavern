import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/user"
import { ErrorsContext } from "../context/errors"

function EmoteBar({emotes}){
    const {user} = useContext(UserContext)
    const {setErrors} = useContext(ErrorsContext)
    const [emoteMap, setEmoteMap] = useState({
        happy: 0,
        sad: 0,
        mad : 0,
        heart: 0
    })

    useEffect(()=>{
        const tempEmoteMap = {...emoteMap}

        for(let i = 0; i < emotes.length; i++){
            const {happy, sad, mad, heart} = emotes[i]

            if (happy === true) tempEmoteMap.happy += 1
            if (sad === true) tempEmoteMap.sad += 1
            if (mad === true) tempEmoteMap.mad += 1
            if (heart === true) tempEmoteMap.heart += 1
        }
        setEmoteMap(tempEmoteMap)
    }, [])

    return(
        <div>
            <p>😀 {emoteMap.happy}</p>
            <p>😢 {emoteMap.sad}</p>
            <p>😠 {emoteMap.mad}</p>
            <p>❤️ {emoteMap.heart}</p>
        </div>
    )
}

export default EmoteBar
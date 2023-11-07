import {useState, useEffect, createContext, useContext} from 'react'
import { ErrorsContext } from './errors'

const GenresContext = createContext()

function GenresProvider({children}){
    const [genres, setGenres] = useState([])
    const {setErrors} = useContext(ErrorsContext)

    useEffect(()=>{
        fetchGenres()

        async function fetchGenres(){
            const response = await fetch('/genres')
            const data = await response.json()
            
            if (response.ok){
                setGenres(data)
            }
            else{
                setErrors(data.ErrorsContext)
            }
        }
    }, [])

    return <GenresContext.Provider value={{genres, setGenres}}>{children}</GenresContext.Provider>
}

export {GenresContext, GenresProvider}
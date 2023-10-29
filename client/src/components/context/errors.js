import {useState, createContext} from 'react'

const ErrorsContext = createContext()

function ErrorsProvider({children}){
    const [errors, setErrors] = useState([])
    
    function displayErrors(){
        return <>{errors.length > 0 && (errors.map(error => <p key={error} style={{color: 'red'}}>{error}</p>))}</>
    }
    return <ErrorsContext.Provider value={{errors, setErrors, displayErrors}}>{children}</ErrorsContext.Provider>
}

export {ErrorsContext, ErrorsProvider}
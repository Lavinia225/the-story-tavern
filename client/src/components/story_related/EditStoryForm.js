import {useState, useContext} from 'react'
import { ErrorsContext } from '../context/errors'
import { UserContext } from '../context/user'

function EditStoryForm({story}){
    const {user} = useContext(UserContext)
    const {setErrors} = useContext(ErrorsContext)
    const [formData, setFormData] = useState({
        title: story.title,
        body: story.body
    })

    return(
        <div id='story-edit-form'>
            <p>hi</p>
        </div>
    )
}

export default EditStoryForm
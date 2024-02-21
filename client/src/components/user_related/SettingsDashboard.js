import { useState } from "react"
import ChangeDisplayNameForm from "./settings/ChangeDisplayNameForm"
import DeleteAccountForm from "./settings/DeleteAccountForm"

function SettingsDashboard(){
    const [hide, setHide] = useState({
        'changeDisplayNameForm': true,
        'deleteAccountForm': true
    })

    function handleChangeHide(component){
        setHide({...hide, [`${component}`]: !hide[`${component}`]})
    }

    return(
        <ul className='user-settings'>
            <li className='category-box'>
                <div>
                    <h3>Change Display Name</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" focusable="false" onClick={()=>handleChangeHide('changeDisplayNameForm')}>
                        <path d="M9.41 14l-1.29-1.29L11.83 9H2V7h9.83L8.12 3.29 9.41 2l5.29 5.29a1 1 0 010 1.41z"></path>
                    </svg>
                </div>
                <ChangeDisplayNameForm hide={hide.changeDisplayNameForm} unhide={handleChangeHide}/>
            </li>
            <li className='category-box'>
                <div>
                    <h3>Delete Account</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" focusable="false" onClick={()=>handleChangeHide('deleteAccountForm')}>
                        <path d="M9.41 14l-1.29-1.29L11.83 9H2V7h9.83L8.12 3.29 9.41 2l5.29 5.29a1 1 0 010 1.41z"></path>
                    </svg>
                </div>
                <DeleteAccountForm hide={hide.deleteAccountForm} unhide={handleChangeHide}/>
            </li>
        </ul>
    )
}

export default SettingsDashboard
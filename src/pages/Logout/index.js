import Auth from "@aws-amplify/auth"
import { Hub } from "@aws-amplify/core"
import { useEffect } from "react"
import { Redirect, useHistory } from "react-router"
import { useState } from "react/cjs/react.development"
import { useUser } from "../../context/userContext"

const Logout = () => {

    const history = useHistory()
    const {setUser} = useUser()
    const [signedOut, setSignedOut] = useState(false)

    useEffect(() =>{
        logout()
        // eslint-disable-next-line 
    },[])

    const logout = async () => {
        await Auth.signOut()
    }

    Hub.listen('auth', ({ payload: { event } }) => {
        switch (event) {
            case 'signOut':
                setSignedOut(true)
                break
            default:
              break
        }
    });

    return signedOut ? (
        <Redirect to='/'/>
    ) : null
}

export default Logout
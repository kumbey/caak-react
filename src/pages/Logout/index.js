import Auth from "@aws-amplify/auth"
import { Hub } from "@aws-amplify/core"
import { useEffect } from "react"
import { Redirect } from "react-router"
import { useState } from "react"
import { useUser } from "../../context/userContext"

const Logout = () => {

    const [signedOut, setSignedOut] = useState(false)
    const { setUser } = useUser()

    useEffect(() =>{
        setUser(null)
        logout()
        return ()=> {
            setSignedOut(null)
        }
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
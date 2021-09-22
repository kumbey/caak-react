import Auth from "@aws-amplify/auth"
import { useEffect } from "react"
import { useHistory } from "react-router"

const Logout = () => {

    const history = useHistory()

    useEffect(() =>{
        logout()
        // eslint-disable-next-line 
    },[])

    const logout = async () => {
        await Auth.signOut()
        history.replace("/")
    }

    return null
}

export default Logout
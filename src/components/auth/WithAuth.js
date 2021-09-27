import { useHistory, useLocation } from "react-router"
import { useEffect } from "react/cjs/react.development"
import { useUser } from "../../context/userContext"

const WithAuth = () => {

    const { user } = useUser()
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        if(user){
            console.log(user.sysUser)
            if(!user.sysUser){
                history.push({pathname: "/register/main", state: {background: location, onlyInfo: true}})
            }
        }
        // eslint-disable-next-line
    },[user])

    return null
}

export default WithAuth
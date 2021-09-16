import { useEffect, useState , Fragment} from "react"
import { useUser } from "../../context/userContext"
import Consts from "../../Utility/Consts"
import { checkUser, useQuery } from "../../Utility/Util"
import Login from "../Login"

const QueryModals = () => {
    const {getQuery} = useQuery()
    const {user} = useUser()

    const [modals] = useState({
        signIn: <Login/>
    })

    const [page, setPage] = useState("")

    
    useEffect(() => {
        setPage(definePage())
        // eslint-disable-next-line
    }, [user])
    
    const definePage = () => {

        const param = getQuery().get(Consts.signInUp)

        if(checkUser(user)){
            if(Object.keys(user.sysUser).length <= 0){
                // LOAD USER INFO PAGE HERE
                return "" 
            }else{
                if(user.sysUser.category.items.length <= 0){
                    //LOAD SELECT CATEGORY PAGE HERE
                    return "" 
                }
            }
        }
        return param
    }

    return(
        <Fragment>
            {modals[page]}
        </Fragment>
    )
}

export default QueryModals
import { useEffect } from "react"
import { useQuery } from "../../Utility/Util"

function WithOutAuth(){

   const {addQuery} = useQuery()
    
    useEffect(() => {
       addQuery("signInUp","signIn")
       //eslint-disable-next-line
    },[])

    return null

}

export default WithOutAuth
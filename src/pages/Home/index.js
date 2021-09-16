import { useUser } from "../../context/userContext"
import { checkUser } from "../../Utility/Util"

const Home = () => {

    const {user} = useUser()

    return(
        <div>
            {
                checkUser(user) ? <h2>Logged user: {user.sysUser.firstname}</h2> :
                    <h2>Not Logged</h2>
            }
        </div>
    )

}

export default Home
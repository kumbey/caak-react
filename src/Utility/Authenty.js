import { Auth , API, graphqlOperation} from "aws-amplify"
import { getUser } from "../graphql-custom/user/queries";


export async function isLogged(user, setUser){
    
  try{

      const usr = await Auth.currentAuthenticatedUser()

      if(usr && user){
        const {sysUser, ...cogUser} = user
        if(JSON.toString(usr) === JSON.toString(cogUser)){
            if(!sysUser){
              let resp = await API.graphql(graphqlOperation(getUser, { id : usr.attributes.sub }))
              setUser({...usr, sysUser: resp.data.getUser})
            }
        }else{
          setUser(null)
        }
      }else{
        setUser(null)
      }
  }catch(ex){
    return
  }
}

export async function signIn(setUser){
  try{
      const usr = await Auth.currentAuthenticatedUser()
      let resp = await API.graphql(graphqlOperation(getUser, { id : usr.attributes.sub }))
      setUser({...usr, sysUser: resp.data.getUser})
  }catch(ex){
    console.log(ex)
  }
}
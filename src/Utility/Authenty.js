import { Auth , API, graphqlOperation} from "aws-amplify"
import { getUser } from "../graphql-custom/user/queries";


export async function isLogged(user, setUser){
    
  try{

      const usr = await Auth.currentAuthenticatedUser()

      if(usr && user){

        const {sysUser, ...cogUser} = user
        console.log(sysUser, cogUser)
        if(JSON.encode(usr) === JSON.encode(cogUser)){
            if(!sysUser){
              let resp = await API.graphql(graphqlOperation(getUser, { id : usr.attributes.sub }))
              setUser({...usr, sysUser: resp.data.getUser})
            }
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
      console.log(usr)
      let resp = await API.graphql(graphqlOperation(getUser, { id : usr.attributes.sub }))
      setUser({...usr, sysUser: resp.data.getUser})
  }catch(ex){
    console.log(ex)
  }
}
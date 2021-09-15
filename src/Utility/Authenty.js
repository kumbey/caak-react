import { Auth } from "aws-amplify"


export async function getSystemUser(user, setUser){
    
  try{
      if(!user.sysUser){
          console.log(user)
      }
  }catch(ex){
    console.log(ex)
  }
}

export const signIn = async (username, password, setUser) => {
    try {
      const currentUser = await Auth.signIn(username, password);
      return currentUser
    } catch (error) {
      throw error
    }
}

export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    throw error
  }
}

export const signOn = async (setUser) => {
  try{
      // let currentUser = await Auth.currentAuthenticatedUser()
  }catch(ex){
    console.log(ex)
  }
}

export const getSignedUser = async () => {
  try{
      let currentUser = await Auth.currentAuthenticatedUser()
      return currentUser
  }catch(ex){
    console.log(ex)
    return null
  }
}

const Authenty = {signOn, signIn, signOut, getSignedUser}


export default Authenty
import {createContext, useContext, useState, useEffect, useMemo} from 'react'
import { Hub } from 'aws-amplify';

const UserContext = createContext()

function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error(`useUser must be used within a CountProvider`)
  }

  return context
}

function UserProvider(props) {

    const [user, setUser] = useState()

    useEffect(() => {
      Hub.listen('auth', ({ payload: { event } }) => {
          switch (event) {
              case 'signOut':
                  setUser(null)
                  break
              default:
          }
      });
  })


    const value = useMemo(() => ({ user, setUser}), [user])
    return <UserContext.Provider value={value} {...props} />
}

export {UserProvider, useUser}
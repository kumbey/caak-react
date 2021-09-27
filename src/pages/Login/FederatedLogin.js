
import { Auth, Hub } from "aws-amplify"
import { Fragment, useEffect } from "react"
import { useParams } from "react-router-dom"

function FederatedLogin(){

    const {type} = useParams()
    console.log(type)

    useEffect(() => {
      
        if(type === "facebook"){
            Auth.federatedSignIn({provider: "Facebook"})
        }else if(type === "google"){
            Auth.federatedSignIn({provider: "Google"})
        }else{
           console.log("HERE")
        }

        Hub.listen('auth', ({ payload: { event } }) => {
            switch (event) {
                case 'signIn':
                    window.close()
                    break
                default:
            }
        });

        // eslint-disable-next-line
    })

    

    return (
        <Fragment>
        </Fragment>
    )

}

export default FederatedLogin
import API from "@aws-amplify/api"
import { graphqlOperation } from "@aws-amplify/api-graphql"
import Storage from "@aws-amplify/storage"
import { useMemo } from "react"
import { useUser } from "../context/userContext"
import { createFile } from "../graphql-custom/file/mutation"
import { checkUser } from "./Util"

export const ApiFileUpload = async (file) => {
    try{
        let fileData = {...file}
        const fileObj = fileData.obj
        delete fileData["obj"]
        delete fileData["url"]
        if(!fileData.id){
            let resp = await API.graphql(graphqlOperation(createFile, {input: fileData}))
            resp = resp.data.createFile
            await Storage.put(resp.id +"."+ resp.ext, fileObj)
            return resp
        }else{
            return fileData
        }
    }catch(ex){
        console.log(ex)
    }
}

export const useListPager = (params) => {
    
    const data = params
    const { user } = useUser()
    let lastToken = null
    let isFinished = false

    async function list(qry , limit, items){

        try{
            let resp = await API.graphql(qry)
            resp = resp.data
            let key = Object.keys(resp)[0]
            let nextToken = resp[key].nextToken
            items = [...items, ...resp[key].items]

            if(items.length < limit && nextToken){
                return await list(qry, nextToken)
            }else{
                if(!nextToken){
                    isFinished = true
                }
                return {items, nextToken}
            }

        }catch(ex){
            console.log(ex)
        }
    }

    async function next(){
        if(!isFinished){
            const qry = {
                query: data.query,
                variables: {...data.variables, nextToken: lastToken},
            }
    
            if(!checkUser(user)){
                qry.authMode = "AWS_IAM"
            }

    
            const {items, nextToken}  = await list(qry, qry.variables.limit, [])
            lastToken = nextToken
    
            return items
        }else{
            return false
        }
    }

    async function renew(){
        lastToken = null
        isFinished = false
        return await next()
    }

    // eslint-disable-next-line
    return useMemo(() => ([next ,renew]), [lastToken, isFinished])
}

const object = {
    ApiFileUpload,
    useListPager
}

export default object

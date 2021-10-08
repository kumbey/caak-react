const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const Counter = require("/opt/tables/Counter")
const { getValuesFromRecord } = require("/opt/util/Util")
const UserTotals = Counter(process.env.API_CAAKMN_USERTOTALSTABLE_NAME, docClient)

async function create(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        let resp = {}

        resp.followers = await UserTotals.update({
            key: "user_id",
            keyVal: newImg.user_id,
            items:[
                {
                    field: "followers",
                    increase: true,
                    count: 1
                }
            ]
        })

        resp.following = await UserTotals.update({
            key: "user_id",
            keyVal: newImg.followed_user_id,
            items:[
                {
                    field: "following",
                    increase: true,
                    count: 1
                }
            ]
        })

        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function update(record){
    try{
        return false
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function remove(record){
    try{

        const { OldImage } = record
        const oldImg = getValuesFromRecord(OldImage)

        let resp = {}

        resp.followers = await UserTotals.update({
            key: "user_id",
            keyVal: oldImg.user_id,
            items:[
                {
                    field: "followers",
                    increase: false,
                    count: 1
                }
            ]
        })

        resp.following = await UserTotals.update({
            key: "user_id",
            keyVal: oldImg.followed_user_id,
            items:[
                {
                    field: "following",
                    increase: false,
                    count: 1
                }
            ]
        })

        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

module.exports = {
    createUserTotals: create,
    updateUserTotals: update,
    removeUserTotals: remove
}
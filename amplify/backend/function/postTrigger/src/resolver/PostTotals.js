const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const Counter = require("/opt/tables/Counter")
const { getValuesFromRecord } = require("/opt/util/Util")
const UserTotals = Counter(process.env.API_CAAKMN_USERTOTALSTABLE_NAME, docClient)
const GroupTotals = Counter(process.env.API_CAAKMN_GROUPTOTALSTABLE_NAME, docClient)
const PostTotals = DB(process.env.API_CAAKMN_POSTTOTALSTABLE_NAME, docClient)

async function create(record){
    try{

        const { NewImage, Keys } = record
        const newImg = getValuesFromRecord(NewImage)

        let data = {
            disableGenId: true,
            pkey: "post_id",
            post_id: Keys.id.S,
            reactions: 0,
            views: 0,
            shares: 0
        }

        let resp = {}

        let respPost = await PostTotals.create(data)

        resp.userTotal = await UserTotals.update({
            key: "user_id",
            keyVal: newImg.user_id,
            items:[
                {
                    field: newImg.status.toLowerCase(),
                    increase: true,
                    count: 1
                }
            ]
        })

        resp.groupTotal = await GroupTotals.update({
            key: "group_id",
            keyVal: newImg.group_id,
            items:[
                {
                    field: newImg.status.toLowerCase(),
                    increase: true,
                    count: 1
                }
            ]
        })

        return {post: respPost}
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function update(record){
    try{

        const { NewImage, OldImage } = record
        const newImg = getValuesFromRecord(NewImage)
        const oldImg = getValuesFromRecord(OldImage)

        let resp = {}

        if(newImg.status !== oldImg.status){
            resp.userTotal = await UserTotals.update({
                key: "user_id",
                keyVal: newImg.user_id,
                items:[
                    {
                        field: newImg.status.toLowerCase(),
                        increase: true,
                        count: 1
                    },
                    {
                        field: oldImg.status.toLowerCase(),
                        increase: false,
                        count: 1
                    }
                ]
            })

            resp.groupTotal = await GroupTotals.update({
                key: "group_id",
                keyVal: newImg.group_id,
                items:[
                    {
                        field: newImg.status.toLowerCase(),
                        increase: true,
                        count: 1
                    },
                    {
                        field: oldImg.status.toLowerCase(),
                        increase: false,
                        count: 1
                    }
                ]
            })
        }

        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function remove(record){
    try{

        const { Keys } = record

        let resp = await PostTotals.remove(Keys.id.S, "post_id")

        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

module.exports = {
    createPostTotals: create,
    updatePostTotals: update,
    removePostTotals: remove
}
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const Counter = require("/opt/tables/Counter")
const { getValuesFromRecord } = require("/opt/util/Util")
const UserTotals = Counter(process.env.API_CAAKMN_USERTOTALSTABLE_NAME, docClient)
const GroupTotals = Counter(process.env.API_CAAKMN_GROUPTOTALSTABLE_NAME, docClient)
const PostTotals = DB(process.env.API_CAAKMN_POSTTOTALSTABLE_NAME, docClient)
const NotificationDB = DB(process.env.API_CAAKMN_NOTIFICATIONTABLE_NAME, docClient)

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

        resp.respPost = await PostTotals.create(data)

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

        resp.Notification = await writeToNotification(newImg)

        return resp
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

            resp.Notification = await writeToNotification(newImg)
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

        // resp.Notification = writeToNotification(newImg)

        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function writeToNotification(post){

    const data = {
        section: "USER",
        type: "POST",
        item_id: post.id,
        action: `POST_${post.status}`,
        from: post.user_id,
        to: post.user_id,
        seen: false
    }

    try{
        await NotificationDB.create(data)

        if(post.status === "PENDING" || post.status === "CONFIRMED"){
            data.section = "GROUP"
            data.type = "POST"
            data.to = post.group_id
            await NotificationDB.create(data)
        }
        
        return "NOTIFICATION_ADDED"
    }catch(ex){
        console.log(ex)
    }
}

module.exports = {
    createPostTotals: create,
    updatePostTotals: update,
    removePostTotals: remove
}
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const Counter = require("/opt/tables/Counter")
const DB = require("/opt/tables/DB")
const { getValuesFromRecord } = require("/opt/util/Util")
const PostTotals = Counter(process.env.API_CAAKMN_POSTTOTALSTABLE_NAME, docClient)
const PostItemsTotals = Counter(process.env.API_CAAKMN_POSTITEMSTOTALSTABLE_NAME, docClient)
const CommentTotals = Counter(process.env.API_CAAKMN_COMMENTTOTALSTABLE_NAME, docClient)
const UserTotals = Counter(process.env.API_CAAKMN_USERTOTALSTABLE_NAME, docClient)
const PostDB = DB(process.env.API_CAAKMN_POSTTABLE_NAME, docClient)
const PostItemsDB = DB(process.env.API_CAAKMN_POSTITEMSTABLE_NAME, docClient)
const CommentDB = DB(process.env.API_CAAKMN_COMMENTTABLE_NAME, docClient)
const NotificationDB = DB(process.env.API_CAAKMN_NOTIFICATIONTABLE_NAME, docClient)

async function create(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)
        return await changeReactions(newImg, true)
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

        return await changeReactions(oldImg, false)

    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function changeReactions(newImg, increase){
    try{
        let resp = {}

        let data = {
            keyVal: newImg.id,
            items:[
                {
                    field: "reactions",
                    increase: increase,
                    count: 1
                }
            ]
        }

        let userTotalsData = {
            key: "user_id",
            items:[
                {
                    increase: increase,
                    count: 1
                }
            ]
        }

        if(newImg.on_to === "POST"){

            //update POST TOTALS
            data.key = "post_id" 
            resp.posTotals = await PostTotals.update(data)

            //update USER TOTALS
            let result = await PostDB.get(newImg.id)
            userTotalsData.keyVal = result.user_id
            userTotalsData.items[0].field = "post_reactions"
            resp.userTotals = UserTotals.update(userTotalsData)

            //WRITE NOTIFICATION
            await writeToNotification(newImg, result.user_id)

        }else if(newImg.on_to === "POST_ITEM"){

            //find POST ITEM by ID
            let result = await PostItemsDB.get(newImg.id)
            let post_id = result.post_id

            //find POST for POST ITEM
            result = await PostDB.get(result.post_id)
            let user_id = result.user_id

            //update POST TOTALS 
            data.keyVal = post_id
            data.key = "post_id"
            resp.posTotals = await PostTotals.update(data)

            //update POST ITEM TOTALS
            data.keyVal = newImg.id
            data.key = "post_item_id"
            resp.posItemTitals = await PostItemsTotals.update(data)

            //update USER ITEM TOTALS
            userTotalsData.key = "user_id"
            userTotalsData.keyVal = user_id
            userTotalsData.items[0].field = "post_items_reactions"
            resp.userTotals = UserTotals.update(userTotalsData)

            //WRITE NOTIFICATION
            await writeToNotification(newImg, user_id)

        }else if(newImg.on_to === "COMMENT"){
            
            //update COMMENT TOTALS
            data.key = "comment_id"
            resp.posItemTitals = await CommentTotals.update(data)

            //update USER TOTALS
            let result = await CommentDB.get(newImg.id)
            userTotalsData.keyVal = result.user_id
            userTotalsData.items[0].field = "comment_reactions"
            resp.userTotals = UserTotals.update(userTotalsData)

            //WRITE NOTIFICATION
            await writeToNotification(newImg, result.user_id)
        }

        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function writeToNotification(reaction, toUserId){

    const data = {
        section: "USER",
        type: "REACTION",
        item_id: reaction.id,
        action: `REACTION_${reaction.on_to}`,
        from: reaction.user_id,
        to: toUserId,
        seen: false
    }

    try{
        await NotificationDB.create(data)
    }catch(ex){
        console.log(ex)
    }
}

module.exports = {
    createReactionTotals: create,
    updateReactionTotals: update,
    removeReactionTotals: remove
}
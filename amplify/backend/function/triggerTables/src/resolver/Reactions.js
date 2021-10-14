
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const { getValuesFromRecord } = require("/opt/util/Util")
const DB = require("/opt/tables/DB")

const CommentTotal = require("../db/CommentTotal")
const PostItemsTotal = require("../db/PostItemsTotal")
const UserTotal = require("../db/UserTotal")
const PostTotal = require("../db/PostTotal")
const NotificationDB = require("../db/Notification")
const PostDB = DB(process.env.API_CAAKMN_POSTTABLE_NAME, docClient)
const PostItems = DB(process.env.API_CAAKMN_POSTITEMSTABLE_NAME, docClient)
const CommentDB = DB(process.env.API_CAAKMN_COMMENTTABLE_NAME, docClient)

async function insert(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)
        await changeReactions(newImg, true)
        
        return true

    }catch(ex){
        console.log(ex)
    }
}


async function remove(record){
  try{

    const { OldImage } = record
    const oldImg = getValuesFromRecord(OldImage)

    await changeReactions(oldImg, false)

    return true

  }catch(ex){
      console.log(ex)
  }
}

async function changeReactions(newImg, increase){
    try{

        const items = [
            {
                field: "reactions",
                increase: increase,
                count: 1
            }
        ]

        const notifiData = {
            section: "USER",
            type: "REACTION",
            seen: false
        }

        if(newImg.on_to === "POST"){

            const post = await PostDB.get(newImg.id)

            await PostTotal.modify(post.id , items)
            items[0].field = "post_reactions"
            await UserTotal.modify(post.user_id, items)
            
            notifiData.item_id = post.id
            notifiData.action = `REACTION_${newImg.on_to}`
            notifiData.from = newImg.user_id
            notifiData.to = post.user_id

        }else if(newImg.on_to === "POST_ITEM"){

            const postItem = await PostItems.get(newImg.id)
            const post = await PostDB.get(postItem.post_id)

            await PostItemsTotal.modify(postItem.id, items)
            await PostTotal.modify(post.id , items)
            items[0].field = "post_items_reactions"
            await UserTotal.modify(post.user_id, items)

            notifiData.item_id = postItem.id
            notifiData.action = `REACTION_${newImg.on_to}`
            notifiData.from = newImg.user_id
            notifiData.to = post.user_id

        }else if(newImg.on_to === "COMMENT"){
            
            let comment = await CommentDB.get(newImg.id)
            await CommentTotal.modify(comment.id, items)
            items[0].field = "comment_reactions"
            await UserTotal.modify(comment.user_id)

            notifiData.item_id = comment.id
            notifiData.action = `REACTION_${newImg.on_to}`
            notifiData.from = newImg.user_id
            notifiData.to = comment.user_id

        }
        
        if(increase){
            await NotificationDB.insert(notifiData)
        }

        return true
    }catch(ex){
        console.log(ex)
    }
}

module.exports = {
    INSERT: insert,
    MODIFY: null,
    REMOVE: remove
}
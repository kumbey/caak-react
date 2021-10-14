
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const { getValuesFromRecord } = require("/opt/util/Util")
const DB = require("/opt/tables/DB")

const CommentTotal = require("../db/CommentTotal")
const PostItemsTotal = require("../db/PostItemsTotal")
const UserTotal = require("../db/UserTotal")
const PostTotal = require("../db/PostTotal")
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

        items = [
            {
                field: "reactions",
                increase: increase,
                count: 1
            }
        ]

        if(newImg.on_to === "POST"){

            const post = await PostDB.get(newImg.id)

            await PostTotal.modify(post.id , items)
            await UserTotal.modify(post.user_id, {...items, field: "post_reactions"})

        }else if(newImg.on_to === "POST_ITEM"){

            const postItem = PostItems.get(newImg.id)
            const post = await PostDB.get(postItem.post_id)

            await PostItemsTotal.modify(postItem.id, items)
            await PostTotal.modify(post.id , items)
            await UserTotal.modify(post.user_id, items, {...items, field: "post_items_reactions"})

        }else if(newImg.on_to === "COMMENT"){
            
            let comment = await CommentDB.get(newImg.id)
            await CommentTotal.modify(comment.id, items)
            await UserTotal.modify(comment.user_id, items, {...items, field: "comment_reactions"})

        }

        return resp
    }catch(ex){
        console.log(ex)
    }
}

module.exports = {
    INSERT: insert,
    MODIFY: null,
    REMOVE: remove
}
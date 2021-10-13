const { getValuesFromRecord } = require("/opt/util/Util")
const CommentTotal = require("../db/CommentTotal")
const PostItemsTotal = require("../db/PostItemsTotal")
const UserTotal = require("../db/PostItemsTotal")

async function insert(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        //CREATE NEW COMMENT TOTAL
        await CommentTotal.insert(newImg.id)

        //UPDATE USER TOTAL
        await PostItemsTotal.modify(newImg.post_item_id, [
            {
                field: "comments",
                increase: true,
                count: 1
            }
        ])

        return true

    }catch(ex){
        console.log(ex)
    }
}


async function remove(record){
  try{

    const { OldImage } = record
    const oldImg = getValuesFromRecord(OldImage)

    let commentTotal = await CommentTotal.get(oldImg.id)

    //UPDATE USER TOTAL
    await UserTotal.modify(oldImg.user_id, [
        {
            field: "comment_reactions",
            increase: false,
            count: commentTotal.reactions
        }
    ])

    await PostItemsTotal.modify(oldImg.post_item_id, [
        {
            field: "comments",
            increase: false,
            count: 1
        }
    ])

    await CommentTotal.remove(oldImg.id)

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
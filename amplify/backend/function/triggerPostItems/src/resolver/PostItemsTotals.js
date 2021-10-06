const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const PostItemsTotal = DB(process.env.API_CAAKMN_POSTITEMSTOTALSTABLE_NAME, docClient)

async function create(record){
    try{

        const { Keys } = record

        let data = {
            disableGenId: true,
            pkey: "post_item_id",
            post_item_id: Keys.id.S,
            reactions: 0,
            comments: 0,
        }

        let respPost = await PostItemsTotal.create(data)

        return {post: respPost}
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function update(record){
    try{
        return null
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function remove(record){
    try{

        const { Keys } = record

        let resp = await PostItemsTotal.remove(Keys.id.S, "post_item_id")

        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

module.exports = {
    createPostItemsTotals: create,
    updatePostItemsTotals: update,
    removePostItemsTotals: remove
}
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const UserTotals = DB(process.env.API_CAAKMN_USERTOTALSTABLE_NAME, docClient)

async function create(record){
    try{

        const { Keys } = record

        let data = {
            disableGenId: true,
            pkey: "user_id",
            user_id: Keys.id.S,
            pending: 0,
            confirmed: 0,
            archived: 0,
            reported: 0,
            drafted: 0,
            following: 0,
            followers: 0,
            post_reactions: 0,
            post_items_reactions: 0,
            comment_reactions: 0,
            unseen: 0
        }

        let resp = await UserTotals.create(data)

        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

module.exports = {
    createUserTotals: create,
}
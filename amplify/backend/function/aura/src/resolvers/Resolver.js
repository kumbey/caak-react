const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const UserTotalsDB = DB(process.env.API_CAAKMN_USERTOTALSTABLE_NAME, docClient)

async function calcAura(ctx){
    try{

        let point = 0

        const { source } = ctx

        const ids = {
            id: source.id,
            user_id: source.user_id
        }

        let resp = await UserTotalsDB.get(ids)

        point += resp.confirmed * 20
        point += resp.followers * 15
        point += resp.followers * 15
        point += resp.post_reactions * 15
        point += resp.post_items_reactions * 10
        point += resp.comment_reactions * 5

        return point

    }catch(ex){
        console.log(ex)
        return 0
    }
}

module.exports = {
    calcAura: calcAura,
}
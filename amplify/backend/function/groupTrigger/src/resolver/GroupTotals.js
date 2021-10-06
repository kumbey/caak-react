const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const GroupTotals = DB(process.env.API_CAAKMN_GROUPTOTALSTABLE_NAME, docClient)

async function create(record){
    try{

        const { Keys } = record

        let data = {
            disableGenId: true,
            pkey: "group_id",
            group_id: Keys.id.S,
            pending: 0,
            confirmed: 0,
            member: 0,
            admin: 0,
            moderator: 0,
            unseen: 0
        }

        let resp = await GroupTotals.create(data)

        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function remove(record){
    try{

        const { Keys } = record

        let resp = await GroupTotals.remove(Keys.id.S, "id")

        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

module.exports = {
    createGroupTotals: create,
    removeGroupTotals: remove
}
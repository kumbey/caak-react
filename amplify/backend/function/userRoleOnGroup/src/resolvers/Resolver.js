const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const GroupUsers = DB(process.env.API_CAAKMN_GROUPUSERSTABLE_NAME, docClient)

async function roleOnGroup(ctx){
    try{

        const { identity, source } = ctx

        const ids = {
            user_id: identity.username,
            group_id: source.id
        }

        let resp = await GroupUsers.get(ids)
        if(Object.keys(resp).length > 0){
            return resp.role
        }else{
            return "NOT_MEMBER"
        }

    }catch(ex){
        console.log(ex)
        return "NOT_MEMBER"
    }
}

module.exports = {
    roleOnGroup: roleOnGroup,
}
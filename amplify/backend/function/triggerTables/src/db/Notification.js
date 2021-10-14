const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const DBClient = DB(process.env.API_CAAKMN_NOTIFICATIONTABLE_NAME, docClient)

async function insert(data){
    try{    

        let resp = await DBClient.create(data)

        return resp
    }catch(ex){
        console.log(ex)
    }
}

async function modify(id, items){
  try{

    return true

  }catch(ex){
      console.log(ex)
  }
}

async function remove(id){
    try{

        // let resp = await DBClient.remove(id, "comment_id")
        
        return true
    }catch(ex){
        console.log(ex)
    }
}

module.exports = {
    insert: insert,
    modify: modify,
    remove: remove
}
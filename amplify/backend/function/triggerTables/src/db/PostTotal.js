const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const DBClient = DB(process.env.API_CAAKMN_POSTTOTALTABLE_NAME, docClient)
const CountClient = Counter(process.env.API_CAAKMN_POSTTOTALTABLE_NAME, docClient)

async function insert(id){
    try{

        let data = {
            disableGenId: true,
            pkey: "post_id",
            __typename: "PostTotal",
            post_id: id,
            reactions: 0,
            views: 0,
            shares: 0
        }

        let resp = await DBClient.create(data)

        return resp
    }catch(ex){
        console.log(ex)
    }
}

async function modify(id, items){
  try{

    const resp = userTotal = await CountClient.update({
        key: "post_id",
        keyVal: id,
        items: items
    })

    return resp

  }catch(ex){
      console.log(ex)
  }
}

async function remove(id){
    try{

        let resp = await DBClient.remove(id, "post_id")
        
        return resp
    }catch(ex){
        console.log(ex)
    }
}

async function get(id){
    try{

        let resp = await DBClient.get({post_id: id})
        
        return resp
    }catch(ex){
        console.log(ex)
    }
}

module.exports = {
    insert: insert,
    modify: modify,
    remove: remove,
    get: get
}
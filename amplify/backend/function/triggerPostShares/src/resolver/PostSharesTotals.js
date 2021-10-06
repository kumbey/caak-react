const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const Counter = require("/opt/tables/Counter")
const { getValuesFromRecord } = require("/opt/util/Util")
const PostTotals = Counter(process.env.API_CAAKMN_POSTTOTALSTABLE_NAME, docClient)

async function create(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        let resp = {}

        let data = {
            key: "post_id",
            keyVal: newImg.post_id,
            items:[
                {
                    field: "shares",
                    increase: true,
                    count: 1
                }
            ]
        }

        resp.posTotals = await PostTotals.update(data)


        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function update(record){
    try{
        return false
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function remove(record){
    try{

        const { OldImage } = record
        const oldImg = getValuesFromRecord(OldImage)

        let resp = {}

        let data = {
            key: "post_id",
            keyVal: oldImg.post_id,
            items:[
                {
                    field: "shares",
                    increase: false,
                    count: 1
                }
            ]
        }

        resp.posTotals = await PostTotals.update(data)


        return resp

    }catch(ex){
        console.log(ex)
        return ex
    }
}

module.exports = {
    createPostSharesTotals: create,
    updatePostSharesTotals: update,
    removePostSharesTotals: remove
}
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const Counter = require("/opt/tables/Counter")
const { getValuesFromRecord } = require("/opt/util/Util")
const PostTotals = Counter(process.env.API_CAAKMN_POSTTOTALSTABLE_NAME, docClient)
const PostItemsTotals = Counter(process.env.API_CAAKMN_POSTITEMSTOTALSTABLE_NAME, docClient)
const CommentTotals = Counter(process.env.API_CAAKMN_COMMENTTOTALSTABLE_NAME, docClient)

async function create(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        let resp = {}

        let data = {
            keyVal: newImg.id,
            items:[
                {
                    field: "reactions",
                    increase: true,
                    count: 1
                }
            ]
        }

        if(newImg.on_to === "POST"){
            data.key = "post_id"
            resp.posTotals = await PostTotals.update(data)
        }else if(newImg.on_to === "POST_ITEM"){
            resp.posTotals = await PostTotals.update(data)

            data.key = "post_item_id"
            resp.posItemTitals = await PostItemsTotals.update(data)
        }else if(newImg.on_to === "COMMENT"){
            data.key = "comment_id"
            resp.posItemTitals = await CommentTotals.update(data)
        }


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
            keyVal: oldImg.id,
            items:[
                {
                    field: "reactions",
                    increase: false,
                    count: 1
                }
            ]
        }

        if(oldImg.on_to === "POST"){
            data.key = "post_id"
            resp.posTotals = await PostTotals.update(data)
        }else if(oldImg.on_to === "POST_ITEM"){
            resp.posTotals = await PostTotals.update(data)

            data.key = "post_item_id"
            resp.posItemTitals = await PostItemsTotals.update(data)
        }else if(oldImg.on_to === "COMMENT"){
            data.key = "comment_id"
            resp.posItemTitals = await CommentTotals.update(data)
        }


        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

module.exports = {
    createReactionTotals: create,
    updateReactionTotals: update,
    removeReactionTotals: remove
}
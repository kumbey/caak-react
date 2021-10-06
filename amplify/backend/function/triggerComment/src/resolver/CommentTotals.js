const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const Counter = require("/opt/tables/Counter")
const DB = require("/opt/tables/DB")
const { getValuesFromRecord } = require("/opt/util/Util")
const PostItemsTotals = Counter(process.env.API_CAAKMN_POSTITEMSTOTALSTABLE_NAME, docClient)
const CommentTotals = Counter(process.env.API_CAAKMN_COMMENTTOTALSTABLE_NAME, docClient)
const CommentTotalsDB = DB(process.env.API_CAAKMN_COMMENTTOTALSTABLE_NAME, docClient)

async function create(record){
    try{

        const { Keys, NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        let resp = {}

        let data = {
            key: "post_item_id",
            keyVal: newImg.post_item_id,
            items:[
                {
                    field: "comments",
                    increase: true,
                    count: 1
                }
            ]
        }

        resp.postItemsTotals = await PostItemsTotals.update(data)

        let data = {
            disableGenId: true,
            pkey: "comment_id",
            comment_id: Keys.id.S,
            reactions: 0,
            subs: 0
        }

        resp.commentTotals = await CommentTotalsDB.create(data)


        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function update(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        let resp = {}

        if(newImg.status === "DELETED"){
            let data = {
                key: "post_item_id",
                keyVal: newImg.post_item_id,
                items:[
                    {
                        field: "comments",
                        increase: false,
                        count: 1
                    }
                ]
            }
    
            resp.postItemsTotals = await PostItemsTotals.update(data)

            if(newImg.type === "SUB"){
                data = {
                    key: "comment_id",
                    keyVal: newImg.parent_id,
                    items:[
                        {
                            field: "subs",
                            increase: false,
                            count: 1
                        }
                    ]
                }
    
                resp.commentTotals = await CommentTotals.update(data)
            }
        }

        return resp
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
            key: "post_item_id",
            keyVal: oldImg.post_item_id,
            items:[
                {
                    field: "comments",
                    increase: false,
                    count: 1
                }
            ]
        }

        resp.postItemsTotals = await PostItemsTotals.update(data)

        if(oldImg.type === "SUB"){
            data = {
                key: "comment_id",
                keyVal: oldImg.parent_id,
                items:[
                    {
                        field: "subs",
                        increase: false,
                        count: 1
                    }
                ]
            }

            resp.commentTotals = await CommentTotals.update(data)
        }

        return resp

    }catch(ex){
        console.log(ex)
        return ex
    }
}

module.exports = {
    createCommentTotals: create,
    updateCommentTotals: update,
    removeCommentTotals: remove
}
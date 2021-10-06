const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const Counter = require("/opt/tables/Counter")
const { getValuesFromRecord } = require("/opt/util/Util")
const GroupTotals = Counter(process.env.API_CAAKMN_GROUPTOTALSTABLE_NAME, docClient)

async function create(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        let resp = {}

        resp.followers = await GroupTotals.update({
            key: "group_id",
            keyVal: newImg.group_id,
            items:[
                {
                    field: newImg.role.toLowerCase(),
                    increase: true,
                    count: 1
                }
            ]
        })

        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function update(record){
    try{
        
        const { NewImage, OldImage } = record
        const newImg = getValuesFromRecord(NewImage)
        const oldImg = getValuesFromRecord(OldImage)

        let resp = {}

        if(newImg.role !== oldImg.role){
            resp.groupTotals = await GroupTotals.update({
                key: "group_id",
                keyVal: newImg.group_id,
                items:[
                    {
                        field: newImg.role.toLowerCase(),
                        increase: true,
                        count: 1
                    },
                    {
                        field: oldImg.role.toLowerCase(),
                        increase: false,
                        count: 1
                    }
                ]
            })
        }

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

        resp.groupTotals = await GroupTotals.update({
            key: "group_id",
            keyVal: oldImg.group_id,
            items:[
                {
                    field: oldImg.role.toLowerCase(),
                    increase: false,
                    count: 1
                }
            ]
        })

        return resp
    }catch(ex){
        console.log(ex)
        return ex
    }
}

module.exports = {
    createPostTotals: create,
    updatePostTotals: update,
    removePostTotals: remove
}
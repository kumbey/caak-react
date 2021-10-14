const { getValuesFromRecord } = require("/opt/util/Util")
const UserTotal = require("../db/UserTotal")
const GraphqlAPI = require("../api/GraphqlAPI")
const { notificationAdded } = require("../queries/mutations")

async function insert(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        if(newImg.section === "USER"){
            //UPDATE USER TOTAL
            await UserTotal.modify(newImg.to, [
                {
                    field: "unseen",
                    increase: true,
                    count: 1
                }
            ])
        }else if(newImg.section === "GROUP"){
             //UPDATE GROUP TOTAL
            await GroupTotal.modify(newImg.to, [
                {
                    field: "unseen",
                    increase: true,
                    count: 1
                }
            ])
        }

        await GraphqlAPI.call({
            query: notificationAdded,
            variables: {
                section: newImg.section,
                to: newImg.to
            },
            operation: "NotificationAdded"
        })

        return true

    }catch(ex){
        console.log(ex)
    }
}

async function modify(record){
    try{

        const { NewImage, OldImage } = record
        const newImg = getValuesFromRecord(NewImage)
        const oldImg = getValuesFromRecord(OldImage)


        if(newImg.seen !== oldImg.seen && newImg.seen){
             
            //UPDATE USER TOTAL
            if(newImg.section === "USER"){
                await UserTotal.modify(newImg.to, [
                    {
                        field: "unseen",
                        increase: false,
                        count: 1
                    }
                ])
            }else if(newImg.section === "GROUP"){
                //UPDATE GROUP TOTAL
                await GroupTotal.modify(newImg.to, [
                    {
                        field: "unseen",
                        increase: false,
                        count: 1
                    }
                ])
            }
        }

        return true

    }catch(ex){
        console.log(ex)
    }
}


async function remove(record){
  try{

    const { OldImage } = record
    const oldImg = getValuesFromRecord(OldImage)

    if(!oldImg.seen){
        if(oldImg.section === "USER"){
            await UserTotal.modify(oldImg.to, [
                {
                    field: "unseen",
                    increase: false,
                    count: 1
                }
            ])
        }else if(oldImg.section === "GROUP"){
            //UPDATE GROUP TOTAL
            await GroupTotal.modify(oldImg.to, [
                {
                    field: "unseen",
                    increase: false,
                    count: 1
                }
            ])
        }
    }

    return true

  }catch(ex){
      console.log(ex)
  }
}

module.exports = {
    INSERT: insert,
    MODIFY: modify,
    REMOVE: remove
}
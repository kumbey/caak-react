const { getValuesFromRecord } = require("/opt/util/Util")
const UserTotal = require("../db/UserTotal")

async function insert(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        await UserTotal.modify(newImg.user_id,[{
                field: "followers",
                increase: true,
                count: 1
            }
        ])

        await UserTotal.modify(newImg.followed_user_id,[{
                field: "following",
                increase: true,
                count: 1
            }
        ])

        return true

    }catch(ex){
        console.log(ex)
    }
}


async function remove(record){
  try{

    const { OldImage } = record
    const oldImg = getValuesFromRecord(OldImage)
      
    await UserTotal.modify(oldImg.user_id,[{
            field: "followers",
            increase: false,
            count: 1
            }
        ])

    await UserTotal.modify(oldImg.followed_user_id,[{
            field: "following",
            increase: false,
            count: 1
        }
    ])

      return true

  }catch(ex){
      console.log(ex)
  }
}

module.exports = {
    INSERT: insert,
    MODIFY: null,
    REMOVE: remove
}
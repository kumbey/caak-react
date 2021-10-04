function genUpdateAttributes(data, pass){

    if(!pass){
        pass = []
    }

    let expression = "set"
    let values = {}
    let names = {}
    let keys = Object.keys(data)
    keys.map((key, index) => {
        if(!pass.includes(key)){
            expression += ` #${index} = :${key}`
            if(index !== (keys.length - 1)){
                expression += `,`
            }
            names[`#${index}`] = key
            values[`:${key}`] = data[key]
        }
    })

    return {expression, values, names}
}

module.exports = {
    updateAttributes: genUpdateAttributes
}
/* Amplify Params - DO NOT EDIT
	API_CAAKMN_GRAPHQLAPIIDOUTPUT
	API_CAAKMN_NOTIFICATIONTABLE_ARN
	API_CAAKMN_NOTIFICATIONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { seenAll } = require("./resolvers/Notification")

const Resolver = {
    Mutation: {
        SeenALL: seenAll
    }
}

exports.handler = async (event) => {
    // TODO implement
    
    const type = Resolver[event.typeName]
    if(type){
        const resolver = type[event.arguments.method]
        if(resolver){   
            return await resolver(event)
        }else{
            console.log("RESOLVER NOT FOUND: ", event.arguments.method)
            console.log(false)
        }
    }else{
        console.log("TYPE NOT FOUND: ", event.type)
        return false
    }

    return true
};

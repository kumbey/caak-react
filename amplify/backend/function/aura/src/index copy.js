/* Amplify Params - DO NOT EDIT
	API_CAAKMN_GRAPHQLAPIIDOUTPUT
	API_CAAKMN_USERTOTALSTABLE_ARN
	API_CAAKMN_USERTOTALSTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/* Amplify Params - DO NOT EDIT
	API_CAAKMN_FOLLOWEDUSERSTABLE_ARN
	API_CAAKMN_FOLLOWEDUSERSTABLE_NAME
	API_CAAKMN_GRAPHQLAPIIDOUTPUT
	API_CAAKMN_GROUPUSERSTABLE_ARN
	API_CAAKMN_GROUPUSERSTABLE_NAME
	API_CAAKMN_REACTIONSTABLE_ARN
	API_CAAKMN_REACTIONSTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { calcAura } = require('./resolvers/Resolver')

const Resolver = {
    User: {
        aura: calcAura,
    }
}

exports.handler = async (event) => {
    try {
        const typeHandler = Resolver[event.typeName]
        if(typeHandler){
            const resolver = typeHandler[event.fieldName]
            if(resolver){
                let result = await resolver(event)
                return result
            }
        }

        throw new Error("Resolver not found")
    } catch (ex) {
        console.log(ex)
        throw new Error("Error on Post lambda function", ex)
    } 
};


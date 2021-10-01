/* Amplify Params - DO NOT EDIT
	API_CAAKMN_GRAPHQLAPIIDOUTPUT
	API_CAAKMN_POSTHISTORYTABLE_ARN
	API_CAAKMN_POSTHISTORYTABLE_NAME
	API_CAAKMN_POSTITEMSTABLE_ARN
	API_CAAKMN_POSTITEMSTABLE_NAME
	API_CAAKMN_POSTTABLE_ARN
	API_CAAKMN_POSTTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { createPost, updatePost } = require('./resolvers/Post')

const Resolver = {
    Mutation: {
        createPost: createPost,
        updatePost: updatePost
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

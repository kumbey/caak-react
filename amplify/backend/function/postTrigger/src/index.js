/* Amplify Params - DO NOT EDIT
	API_CAAKMN_GRAPHQLAPIIDOUTPUT
	API_CAAKMN_GROUPTOTALSTABLE_ARN
	API_CAAKMN_GROUPTOTALSTABLE_NAME
	API_CAAKMN_POSTITEMSTOTALSTABLE_ARN
	API_CAAKMN_POSTITEMSTOTALSTABLE_NAME
	API_CAAKMN_POSTTOTALSTABLE_ARN
	API_CAAKMN_POSTTOTALSTABLE_NAME
	API_CAAKMN_USERTOTALSTABLE_ARN
	API_CAAKMN_USERTOTALSTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const {createPostTotals, updatePostTotals, removePostTotals} = require("./resolver/PostTotals")

const Resolver = {
    INSERT: createPostTotals,
    MODIFY: updatePostTotals,
    REMOVE: removePostTotals
}

exports.handler = async (event) => {
    try{
      console.log(JSON.stringify(event))
      console.log(JSON.stringify(event, null, 2));
      
      for(let i=0; i < event.Records.length; i++){
        let record = event.Records[i]
        const resolver = Resolver[record.eventName]
        if(resolver){
            let result = await resolver(record.dynamodb)
            return result
        }
      }
  
      return Promise.resolve('Successfully processed DynamoDB record');
    }catch(ex){
      console.log(ex)
      return Promise.resolve('Error processed DynamoDB record %j', ex);
    }
};

/* Amplify Params - DO NOT EDIT
	API_CAAKMN_GRAPHQLAPIENDPOINTOUTPUT
	API_CAAKMN_GRAPHQLAPIIDOUTPUT
	API_CAAKMN_GROUPTOTALTABLE_ARN
	API_CAAKMN_GROUPTOTALTABLE_NAME
	API_CAAKMN_NOTIFICATIONTABLE_ARN
	API_CAAKMN_NOTIFICATIONTABLE_NAME
	API_CAAKMN_USERTOTALTABLE_ARN
	API_CAAKMN_USERTOTALTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const Notification = require("./resolver/Notification")

const Types = {
	Notification: Notification,
}

exports.handler = async (event) => {
    //eslint-disable-line
    try{
      
      for(let i=0; i < event.Records.length; i++){
		
        let record = event.Records[i]

		let db_name = ""

		if(record.eventName === "INSERT" || record.eventName === "MODIFY"){
			db_name = record.dynamodb.NewImage["__typename"].S
		}else if(record.eventName === "REMOVE"){
			db_name = record.dynamodb.OldImage["__typename"].S
		}
		
		const typeHandler = Types[db_name]
		if(typeHandler){
			const resolver = typeHandler[record.eventName]

			if(resolver){
				let result = await resolver(record.dynamodb)
				return result
			}else{
				console.log("RESOLVER NOT FOUND:", record.eventName)
			}
		}else{
			console.log("TYPE HANDLER NOT FOUND:", db_name)
		}
	}
  
      return Promise.resolve('Successfully processed DynamoDB record');
    }catch(ex){
      console.log(ex)
      return Promise.resolve('Error processed DynamoDB record %j', ex);
    }
  };

/* Amplify Params - DO NOT EDIT
	API_CAAKMN_GRAPHQLAPIENDPOINTOUTPUT
	API_CAAKMN_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

exports.handler = event => {
  //eslint-disable-line
  event.Records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });

  console.log(JSON.stringify(event))
  return Promise.resolve('Successfully processed DynamoDB record');
};

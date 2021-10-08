/* Amplify Params - DO NOT EDIT
	API_CAAKMN_COMMENTTOTALSTABLE_ARN
	API_CAAKMN_COMMENTTOTALSTABLE_NAME
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

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
	console.log(JSON.stringify(event))
    return response;
};

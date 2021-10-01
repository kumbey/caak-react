const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');
const { updateAttributes } = require('../util/Generate')


const db = (table) => {

    const tableName = table

    async function get(id){

        const params = {
            TableName: tableName,
            Key: {
                id: id
            }
        }
    
        try {
            const result = await docClient.get(params).promise()
            if(result.statusCode){
                throw result
            }
            return result.Item
        } catch (err) {
            throw err
        }
    }

    async function list(name, value, key){

        const params = {
            TableName: tableName,
            IndexName: key,
            KeyConditionExpression: '#name = :value',
            ExpressionAttributeValues: { ':value': value },
            ExpressionAttributeNames: { '#name': name }
        }
    
        try {
            const result = await docClient.query(params).promise()
            if(result.statusCode){
                throw result
            }

            return result.Items
        } catch (err) {
            throw err
        }
    }

    async function create(data){
        try {

            const now = new Date().toISOString()
    
            data.id = uuidv4()
    
            if(!data.createdAt){
                data.createdAt = now
            }
    
            if(!data.updateAt){
                data.updatedAt = now
            }
    
    
            const params = {
                TableName: tableName,
                Item: data,
                ConditionExpression: "attribute_not_exists(id)",
                ReturnValues : "NONE"
            }
    
            let result = await docClient.put(params).promise();
            if(result.statusCode){
                throw result
            }
            return data
        } catch (err) {
            throw err;
        }
    }
    
    async function update(data, pass){
        try {

            if(!pass){
                pass = ["id"]
            }

            const now = new Date().toISOString()
            
            data.updatedAt = now
            
            const { expression, values, names } = updateAttributes(data, pass)
            const params = {
                TableName: tableName,
                Key:{
                    id: data.id,
                },
                ConditionExpression: "attribute_exists(id)",
                UpdateExpression: expression,
                ExpressionAttributeValues: values,
                ExpressionAttributeNames: names,
                ReturnValues : "ALL_NEW"
            }
    
            let result = await docClient.update(params).promise();
            if(result.statusCode){
                throw result
            }
            return result.Attributes
        } catch (err) {
            throw err;
        }
    }

    async function remove(id){
        try {
            const params = {
                TableName: tableName,
                Key:{
                    id: id,
                },
                ConditionExpression: "attribute_exists(id)"
            }
    
            let result = await docClient.delete(params).promise();
            if(result.statusCode){
                throw result
            }
            return id
        } catch (err) {
            throw err;
        }
    }
    
    return {
        get: get,
        list: list,
        create: create,
        update: update,
        remove: remove
    }
}

module.exports = db
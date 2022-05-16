'use strict'

const AWS = require('aws-sdk');


const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createStudent = (event, context, callback) => {

    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);

    if( typeof data.studentNum !== 'string' ) {
        console.error('Task is not a string');
        const response = {
            statusCode: 400,
            body: JSON.stringify({ "message":"Task is not a string." })
        }

        return;
    }

    const params = {
        TableName: 'studentst',
        Item: {
            id: data.id,
            studentNum: data.studentNum,
            email: data.email,
            password: data.password,
            done: false,
            createdAt: datetime,
            updatedAt: datetime
        }
    };

    dynamoDb.put(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 201,
            body: JSON.stringify(data.Item),
            headers: {
                'Access-Control-Allow-Headers' : "*"
            }
        };

        callback(null, response);
    });
}
import { PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyHandler } from 'aws-lambda';

import { document } from '../../utils/dynamodbClient';

interface IRequestBody {
  name: string;
  age: number;
  role: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {

  try {

    const { id } = event.pathParameters;
    const { name, age, role } = JSON.parse(event.body) as IRequestBody;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing path parameters: [id]',
        })
      }
    }

    const now = new Date().toJSON();

    await document.send(new PutItemCommand({
      TableName: 'users',
      Item: {
        id: { S: id },
        name: { S: name },
        age: { N: age.toString() },
        role: { S: role },
        updatedAt: { S: now },
      },
      ConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': {'S': id },
      },
    }));

    const response = await document.send(new QueryCommand({
      TableName: 'users',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': { 'S': id },
      },
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(response.Items[0]),
    }
  } catch (error) {
    let body = 'Internal Server Error'
    if (error.message === 'ConditionalCheckFailedException') {
      body = JSON.stringify({
        message: 'User Not Found',
      });
    }

    return {
      statusCode: 400,
      body,
    }
  }
}

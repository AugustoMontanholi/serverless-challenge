import { APIGatewayProxyHandler } from 'aws-lambda';
import { GetItemCommand } from '@aws-sdk/client-dynamodb';

import { document } from '../../utils/dynamodbClient';

export const handle: APIGatewayProxyHandler = async (event) => {

  try {

    const { id } = event.pathParameters;

    const response = await document.send(new GetItemCommand({
      TableName: 'users',
      Key: {
        id: {
          S: id,
        }
      },
      AttributesToGet: ['id', 'name', 'age', 'role', 'createdAt', 'updatedAt']
    }));

    if (!response.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'User Not Found'
        }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response.Item),
    }
  } catch (error) {
    return {
      statusCode: error.message ? 400 : 500,
      body: error.message ? error.message : 'Internal Server Error',
    }
  }
}

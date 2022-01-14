import { APIGatewayProxyHandler } from 'aws-lambda';
import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';

import { document } from '../../utils/dynamodbClient';

export const handle: APIGatewayProxyHandler = async (event) => {

  try {
    const { id } = event.pathParameters;

    const command = new DeleteItemCommand({
      TableName: 'users',
      Key: {
        id: {
          S: id,
        }
      },
    });

    await document.send(command);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: "User deleted"
      }),
    }
  } catch (error) {
    return {
      statusCode: error.message ? 400 : 500,
      body: error.message ? error.message : 'Internal Server Error',
    }
  }
}

import { APIGatewayProxyHandler } from 'aws-lambda';
import { ScanCommand } from '@aws-sdk/client-dynamodb';

import { document } from '../../utils/dynamodbClient';

export const handle: APIGatewayProxyHandler = async () => {

  try {
    const command = new ScanCommand({
      TableName: 'users',
    });

    const response = await document.send(command);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response.Items),
    }
  } catch (error) {
    return {
      statusCode: error.message ? 400 : 500,
      body: error.message ? error.message : 'Internal Server Error',
    }
  }
}

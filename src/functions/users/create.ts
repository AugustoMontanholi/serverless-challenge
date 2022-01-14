import { APIGatewayProxyHandler } from 'aws-lambda';
import { PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { v4 } from 'uuid';

import { document } from '../../utils/dynamodbClient';

interface IRequestBody {
  id: string;
  name: string;
  age: number;
  role: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {

  try {
    const { name, age, role } = JSON.parse(event.body) as IRequestBody;

    const id = v4();
    const now = new Date().toJSON();

    await document.send(new PutItemCommand({
      TableName: 'users',
      Item: {
        id: { S: id },
        name: { S: name },
        age: { N: age.toString() },
        role: { S: role },
        createdAt: { S: now },
        updatedAt: { S: now },
      },
    }));

    const response = await document.send(new ScanCommand({
      TableName: 'users',
      FilterExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': { 'S': id },
      },
    }));

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response.Items[0], null, 2),
    }
  } catch (error) {
    return {
      statusCode: error.message ? 400 : 500,
      body: error.message ? error.message : 'Internal Server Error',
    }
  }
}

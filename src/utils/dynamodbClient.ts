import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000'
}

const isOffline = () => process.env.IS_OFFLINE;

export const document = isOffline() ? new DynamoDBClient(options) : new DynamoDBClient({});

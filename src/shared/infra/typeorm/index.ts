import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database', port = 5432): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      port: process.env.NODE_ENV === 'test' ? 5433 : 5432,
      database: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database,
    }),
  );
}
import DatabaseConnection from '../../libs/mysql';
import uuid from 'uuid/v4';
import { PoolConnection, Pool } from 'mysql2/promise';
import QueryTransaction from './queryTransactions';

class QueryExecutor {

  static async _preparedQuery(connection: PoolConnection | Pool,  query: string, values: any[]) {
    const [results, fields] = await connection.execute(query, values);
    return {
      results,
      fields
    };
  }

  static async _query(connection: PoolConnection | Pool,  query: string) {
    const [results, fields] = await connection.query(query);
    return {
      results,
      fields
    };
  }

  static async preparedQuery(query: string, values: any[], transaction?: QueryTransaction) {
    if(transaction) {
      return transaction.preparedQuery(query, values);
    }
    console.log(`Executing following query **--  ${query} --** with values [${values}]`);
    const connPool = await DatabaseConnection.getConnectionPool();
    return this._preparedQuery(connPool, query, values);
  }

  static async query(query: string) {
    console.log(`Executing following query **--  ${query} --**`);
    const connPool = await DatabaseConnection.getConnectionPool();
    this._query(connPool, query);
  }

  static async startTransaction() {
    const id = uuid();
    console.log(`Starting mysql transaction with id |${id}|`);
    const connPool = await DatabaseConnection.getConnectionPool();
    const connection = await connPool.getConnection();
    return {
      id,
      connection
    }
  }
}


export default QueryExecutor;

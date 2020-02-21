import DatabaseConnection from '../../libs/mysql';
import uuid from 'uuid/v4';
import { PoolConnection } from 'mysql2/promise';
import QueryExecutor from './queryExecutor';
import { InvalidUsageError } from './../errors/invalidUsage';

class QueryTransaction {
  private id: string;
  private connection: PoolConnection;
  private isInitialzed: boolean = false;

  constructor(name: string) {
    const id = uuid();
    this.id = `${name}|${id}`;
  }

  async init() {
    console.log(`Starting mysql transaction with id |${this.id}|`);
    const connPool = await DatabaseConnection.getConnectionPool();
    this.connection = await connPool.getConnection();
    await this.connection.beginTransaction();
    this.isInitialzed = true;
  }

  async preparedQuery(query: string, values: any[]) {
    if(!this.isInitialzed) {
      throw new InvalidUsageError(`Must call init() before this`, `QueryTransaction`);
    }
    console.log(`Executing query in transaction ${this.id} -- query ${query} with values ${values} --`)
    return QueryExecutor._preparedQuery(this.connection, query, values);
  }

  async commit() {
    await this.connection.commit();
    this.connection.release();
  }

  async rollback() {
    await this.connection.rollback();
    this.connection.release();
  }


}


export default QueryTransaction;

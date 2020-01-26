import DatabaseConnection from '../../libs/mysql';

class QueryExecutor {
  static async preparedQuery(query: string, values: any) {
    console.log(`Executing following query ${query}`);
    const connPool = await DatabaseConnection.getConnectionPool();
    const [results, fields] = await connPool.execute(query, values);
    return {
      results,
      fields
    };
  }
}


export default QueryExecutor;

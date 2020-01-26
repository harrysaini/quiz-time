import QueryExecutor from '../utils/database/queryExecutor';

/** Represent database query layer */
export default class DAO {
  tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async findById<T>(id: string): Promise<T | null> {
    const query = `SELECT * FROM \`${this.tableName}\`  WHERE \`id\` = ?`;
    const { results, fields } = await QueryExecutor.preparedQuery(query, [id]);
    if(results.length) {
      return results[0];
    } else {
      return null;
    }
  }
}

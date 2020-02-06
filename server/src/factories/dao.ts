import QueryExecutor from '../utils/database/queryExecutor';

/** Represent database query layer */
export default class DAO {
  tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async findById(id: string): Promise<any | null> {
    const query = `SELECT * FROM \`${this.tableName}\`  WHERE \`id\` = ?`;
    const { results, fields } = await QueryExecutor.preparedQuery(query, [id]);
    return results.length ? results[0] : null;
  }
}

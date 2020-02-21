import QueryExecutor from '../utils/database/queryExecutor';
import map = require('lodash/map');
import { toMysqlFormat } from '../utils/dateUtils';
import QueryTransaction from 'utils/database/queryTransactions';

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

  async insert(fields: string[], values: any[], transaction?: QueryTransaction) {
    return DAO.insert(this.tableName, fields, values, transaction);
  }

  static getFieldsList(fields: string[]) {
    return map(fields, field => `\`${field}\``).join(',');
  }

  static getValuesPlaceHolders(fields: string[]) {
    return fields.map(field => '?').join(',')
  }

  static async insert(tableName: string, fields: string[], values: any[], transaction?: QueryTransaction) {
    fields.push('createdAt', 'updatedAt');
    const query = `INSERT INTO \`${tableName}\` (${DAO.getFieldsList(fields)}) VALUES( ${DAO.getValuesPlaceHolders(fields)} )`;
    const now = new Date();
    await QueryExecutor.preparedQuery(query, [
      ...values,
      toMysqlFormat(now),
      toMysqlFormat(now)
    ], transaction);
  }

}

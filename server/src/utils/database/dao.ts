/** Represent database query layer */

export default class DAO {
  tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }
}

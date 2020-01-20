import config from 'config';

const DATABASE_NAME = config.get('db.database');

// TODO: will implement it later after more understanding of SQL
const QueryBuilder =  {
  INSERT<T>(tableName: string, obj: T) {
    const keys = Object.keys(obj);
    const fields = keys.join(',');
    const placeholders = keys.map(key => '?').join(',');
    const query =  `INSERT INTO \`${DATABASE_NAME}\`.\`${tableName}\` (${fields}) VALUES (${placeholders})` ;
    return query;
  }
}


export default QueryBuilder;

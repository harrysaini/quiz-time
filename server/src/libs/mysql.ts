import { createConnection, Connection, Pool, createPool } from 'mysql2/promise';
import config from 'config';

const creds = {
  host: config.get('db.host') as string,
  user: config.get('db.username') as string,
  database: config.get('db.database') as string,
  password: config.get('db.password') as string,
}

class DatabaseConnection {
  private static setupConnection: Connection;
  private static pool: Pool;

  /**
   * Get database config connection
   */
  static async getSetupConnection() {
    const connection = this.setupConnection || await createConnection({
      ...creds,
      multipleStatements: true
    });
    this.setupConnection = connection;
    return connection;
  }

  /**
   * Get connection pool
   */
  static async getConnectionPool() {
    const pool = this.pool || await createPool({
      ...creds,
      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 40
    });
    this.pool = pool;
    return pool;
  }
}


export default DatabaseConnection;

import { createConnection, Connection, Pool, createPool, ConnectionOptions } from 'mysql2/promise';
import config from 'config';

const creds: ConnectionOptions = {
  host: config.get('db.host') as string,
  user: config.get('db.username') as string,
  database: config.get('db.database') as string,
  password: config.get('db.password') as string,
  // debug: true
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
      multipleStatements: true,

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
      queueLimit: 100
    });
    this.pool = pool;
    return pool;
  }
}


export default DatabaseConnection;

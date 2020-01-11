import DatabaseConnection from "../libs/mysql";
import FSUtils from '../utils/fsUtils';
import path = require("path");
import { Connection } from "mysql2/promise";

const initSQLFilePath = path.resolve(__dirname, './../../sql/init_tables.sql');
const dropSQLFilePath = path.resolve(__dirname, './../../sql/drop_tables.sql');

export const initTables = async (connection: Connection) => {
  const initTablesSQLFile = await FSUtils.readFile(initSQLFilePath);
  const [rows, fields] = await connection.query(initTablesSQLFile);

  console.log(rows, fields);
};


export const dropTables = async (connection: Connection) => {
  const dropTablesSQLFile = await FSUtils.readFile(dropSQLFilePath);
  const [rows, fields] = await connection.query(dropTablesSQLFile);
  console.log(rows, fields);
};

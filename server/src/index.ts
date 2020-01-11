import app from './libs/express';
import DatabaseConnection from './libs/mysql';
import { initTables, dropTables } from './helpers/setupDB';

const port = app.get('port');

const setServer = async () => {
  const connection = await DatabaseConnection.getSetupConnection();
  // connection.connect();
  await dropTables(connection);
  await initTables(connection);
  connection.destroy();
};

setServer().then(() => {
  app.listen(port, () => {
    console.log('quiz-app-game:server:' + `Listening on ${port}`);
  });
}).catch((err) => {
  console.log(err);
});

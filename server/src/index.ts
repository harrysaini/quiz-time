import app from './libs/express';
import DatabaseConnection from './libs/mysql';
import { initTables, dropTables } from './helpers/setupDB';
import './utils/logger'
import addQuestionsToDB from './helpers/addQuestion';
const port = app.get('port');

const setServer = async () => {
  return ;
  const connection = await DatabaseConnection.getSetupConnection();
  connection.connect();
  await dropTables(connection);
  await initTables(connection);
  connection.destroy();
  await addQuestionsToDB();
};


setServer().then(() => {
  app.listen(port, () => {
    console.log('quiz-app-game:server:' + `Listening on ${port}`);
  });
}).catch((err) => {
  console.log(err);
});

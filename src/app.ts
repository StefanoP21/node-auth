import { envs } from './config';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  //TODO: connect database

  //TODO: start server
  new Server({ port: envs.PORT }).start();
}

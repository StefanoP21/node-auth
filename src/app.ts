import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  //TODO: connect database

  //TODO: start server
  const server = new Server({});
  server.start();
}

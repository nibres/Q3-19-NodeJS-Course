import * as Server from './server';

import cfg from './cfg';

const server = Server.createServer();

process.on('uncaughtException', error => console.error('Uncaught exception', error));
process.on('unhandledRejection', (reason, promise) => console.error(
  'Unhandled Rejection at:',
  promise,
  'reason:', reason
));

server.listen(cfg.PORT, () => {
  console.log(`Server listening on port ${cfg.PORT}`)
});

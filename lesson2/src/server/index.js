import https from 'http';
import URL from 'url';

import routes from '../routes';
import { responseMessage } from '../helpers/Response';

const requestHandler = (req, res) => {
  const { method, url: urlString } = req;

  const url = URL.parse(urlString, true)

  const hasRoute = !!routes[url.pathname]

  if (hasRoute) {
    const routeHandler = routes[url.pathname];

    try {
      routeHandler(req, res);
    } catch(e) {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(responseMessage('Server internal error occured'));
    }

  } else {
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.end(responseMessage('Invalid endpoint'));
  }
}

export const createServer = () => {
  const server = https.createServer();
  server.on('request', requestHandler);
  server.on('error', err => {
    console.error('Server error occured', err);
  });
  return server;
}


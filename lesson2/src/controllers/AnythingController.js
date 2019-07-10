import http from 'http';

import { METHOD } from '../constants'
import { requestData } from '../helpers'

const proxyOptions = {
  method: METHOD.GET,
  hostname: 'www.google.com',
  port: 80,
}

const AnythingController = async (_, res) => {
  try {
    const data = await requestData(proxyOptions);
    res.writeHead(200);
    res.end(data);
  } catch(e) {
    console.log(e)
    res.writeHead(500);
    res.end();
  }
}

export default AnythingController;

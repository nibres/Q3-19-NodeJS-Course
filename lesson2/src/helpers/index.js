import http from 'http';

export const getRequestBody = (request) => (
  new Promise((resolve, reject) => {
    let body = [];

    request.on('data', chunk => body.push(chunk));
    request.on('end', () => {
      const result = Buffer.concat(body).toString();
      resolve(result)
    });

    request.on('error', (err) => {
      console.error("Request body failed", err);
      reject(err)
    });
  })
);

export const caseInsensitiveValue = (key, object) => (
  object[key.toLowerCase()] || object[key.toUpperCase()]
);

export const requestData = async (options) => (
  new Promise((resolve, reject) => {
    const httpRequest = http.request(options, res => {
      let data = [];
      res.setEncoding('utf8');
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(data.join('')));
    });

    httpRequest.on('error', (err) => {
      console.error("Failed to load external data with options", options, err);
      reject(err)
    });

    httpRequest.end();
  })
);


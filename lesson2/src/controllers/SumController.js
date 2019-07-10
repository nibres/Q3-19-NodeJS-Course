import URL from 'url';

import { METHOD } from '../constants';
import { getRequestBody, caseInsensitiveValue } from '../helpers';
import { responseError, responseSum } from '../helpers/response';

const QUERY_A = 'a';

const SumController = async (req, res) => {
  try {
    const { method, url: urlString } = req;

    if (method !== METHOD.POST) {
      throw new Error('Invalid method');
    }

    const url = URL.parse(urlString, true)

    const queryParamA = caseInsensitiveValue(QUERY_A, url.query)

    if (!queryParamA) {
      throw new Error('Missing parameter \'a\'');
    }

    const paremterA = parseInt(queryParamA)

    const data = await getRequestBody(req);

    if (!data) {
      throw new Error('Missing parameter \'b\'');
    }

    const parameterB = parseInt(data)

    if (isNaN(paremterA) || isNaN(parameterB)) {
      throw new Error('Invalid arguments');
    }

    const sum = paremterA + parameterB;

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(responseSum(sum));
  } catch (e) {
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.end(responseError(e));
  }
};

export default SumController;

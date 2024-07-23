import { Response } from 'express';

const STATUS_CODES: any = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing', // WebDAV (RFC 2518)
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  408: 'Request Timeout',
  409: 'Conflict',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

const send = (res: Response, statusCode = 200, msg?: any, data?: any, meta?: any) => {
  if (!STATUS_CODES[statusCode]) {
    throw new Error(`Invalid status code: ${statusCode}`);
  }

  const defaultMessage = STATUS_CODES[statusCode];
  msg = msg || defaultMessage;

  return res.status(statusCode).send({
    success: statusCode >= 200 && statusCode < 300, // Set success based on 2xx range
    code: statusCode,
    msg,
    data,
    meta,
  });
};

export default send;

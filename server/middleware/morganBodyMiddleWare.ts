// @ts-nocheck

import { Express } from 'express';
import morganBody, { ThemeType } from 'morgan-body';
import dotenv from 'dotenv';

const morganBodyMiddleware = (app: Express) => {
  dotenv.config();

  morganBody(app, {
    logReqUserAgent: true,
    logRequestBody: true,
    logResponseBody: true,
    logReqHeaders: true,
    logResHeaders: true,
    logReqIp: true,
    logReqUrl: true,
    logReqMethod: true,
    logResStatus: true,
    logTime: true,
    logLevel: 'debug',
    logColor: true,
    logFile: './logs/requests.log',
    maxBodyLength: parseInt(process.env.MAX_BODY_LENGTH || '2000', 10),
    stream: process.stdout,
    theme: 'lightened' as ThemeType,
    // skip: function (req, res) { return res.statusCode < 400 }
  });
};

export default morganBodyMiddleware;

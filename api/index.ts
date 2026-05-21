import type {IncomingMessage, ServerResponse} from 'node:http';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const {createApp} = require('../dist/server-app.cjs') as {
  createApp: () => Promise<(
    req: IncomingMessage,
    res: ServerResponse,
  ) => void>;
};

const appPromise = createApp();

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const app = await appPromise;
  app(req, res);
}

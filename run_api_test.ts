import express from 'express';
import { createApp } from './src/server/app';

async function run() {
  const app = await createApp();
  const testApp = express();
  testApp.use(app);

  testApp.listen(3006, async () => {
    try {
      const res = await fetch('http://localhost:3006/api/market/indices');
      const data = await res.text();
      console.log('STATUS:', res.status);
      console.log('RESPONSE:', data);
    } catch(e) {
      console.error('ERROR:', e);
    } finally {
      process.exit(0);
    }
  });
}
run();

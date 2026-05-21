import {createApp} from './src/server/app.ts';

const port = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  const app = await createApp();

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Server startup failed:', error);
  process.exit(1);
});

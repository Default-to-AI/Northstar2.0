import {createApp} from './src/server/app.ts';

const port = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  const app = await createApp();

  const host = '0.0.0.0';

  app.listen(port, host, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Server startup failed:', error);
  process.exit(1);
});

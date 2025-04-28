import e from 'express';
import { exception } from './middlewares/exceptions';
import morgan from 'morgan';
import router from './routes';
import cors from 'cors';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { swaggerOptions } from './swaggerOptions';

const app = e();
const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

expressJSDocSwagger(app)(swaggerOptions);
app.use(e.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  })
);

app.use(morgan('combined'));
app.use(router);
app.use(exception);

const findAvailablePort = (port: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      server.close();
      resolve(port);
    });

    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is in use, trying ${port + 1}`);
        resolve(findAvailablePort(port + 1));
      } else {
        reject(err);
      }
    });
  });
};

const startServer = async () => {
  try {
    const port = await findAvailablePort(DEFAULT_PORT);
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
      console.log(`📚 API Documentation available at http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

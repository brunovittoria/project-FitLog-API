import e from 'express';
import { exception } from './middlewares/exceptions';
import morgan from 'morgan';
import router from './routes';
import cors from 'cors';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { swaggerOptions } from './swaggerOptions';

const app = e();

expressJSDocSwagger(app)(swaggerOptions);
app.use(e.json());

app.use(
  cors({
    origin: 'http://localhost:3000', // URL do FE
    credentials: true
  })
);

app.use(morgan('combined'));

app.use(router);

app.use(exception);

const startServer = async (initialPort: number) => {
  const findAvailablePort = (port: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      const server = app.listen(port, () => {
        server.close();
        resolve(port);
      });

      server.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          // Tenta a próxima porta
          resolve(findAvailablePort(port + 1));
        } else {
          reject(err);
        }
      });
    });
  };

  try {
    const port = await findAvailablePort(initialPort);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(3001);

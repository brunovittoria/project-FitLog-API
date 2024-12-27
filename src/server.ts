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

app.listen(3001, () => console.log('Server is running on port 3001'));

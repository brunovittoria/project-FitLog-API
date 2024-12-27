import { resolve } from 'node:path';
import type { Options } from 'express-jsdoc-swagger';

export const swaggerOptions: Options = {
  info: {
    version: process.env.npm_package_version || '',
    title: process.env.API_NAME || 'API MROI',
    license: {
      name: 'MIT'
    },
    description: 'API description',
    contact: {
      name: 'Bruno Vittoria',
      email: 'brunogun1999@gmail.com'
    }
  },
  security: {
    Bearer: {
      type: 'http',
      scheme: 'bearer'
    }
  },
  filesPattern: `./**/routes.${
    process.env.NODE_ENV === 'production' ? 'js' : 'ts'
  }`,
  baseDir: resolve(__dirname, '..'),
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false
};

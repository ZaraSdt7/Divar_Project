import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets('file-uploads', {
    prefix: '/file-uploads/',
  }),
    app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('Divar Project')
    .setDescription('API documentation Of Divar Project')
    .setVersion('1.0')
    .addTag('Nest')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      name: 'Authorization',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
  app.enableCors({
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'platform',
      'version',
      'x-api-key',
    ],
    origin: '*',
    credentials: true,
  });
  app.use(compression());
  app.use(helmet());

  await app.listen(4000, () => {
    console.log('Listen on http://localhost:5000/api');
  });
}
bootstrap();

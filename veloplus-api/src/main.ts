import { NestFactory } from '@nestjs/core';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  // TODO
  // const config = new DocumentBuilder()
  // .setTitle('Car Route Service')
  // .setDescription('The Car Route Service API')
  // .setVersion('1.0')
  // .addTag('Car Route Service')
  // .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { KafkaErrorFilter } from './utility/kafkaerror.utility';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new KafkaErrorFilter()); //kafka error handler 
  const config = new DocumentBuilder().build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();

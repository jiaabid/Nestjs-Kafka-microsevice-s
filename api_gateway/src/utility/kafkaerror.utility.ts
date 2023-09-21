import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { KafkaJSError } from 'kafkajs';

@Catch(KafkaJSError)
export class KafkaErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(KafkaErrorFilter.name);

  catch(exception: KafkaJSError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 500; // Customize the status code as needed

    this.logger.error(`Kafka Error: ${exception.message}`, exception);

    response.status(status).json({
      message: 'Kafka communication error',
      error: exception.message,
    });
  }
}
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Error)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Check if it's a known Prisma error or a DriverAdapter error
    const code = exception.code;
    const isPrismaError = exception.name === 'PrismaClientKnownRequestError' || 
                          (exception.message && exception.message.includes('viola'));

    if (code === 'P2002' || (exception.message && exception.message.includes('UniqueConstraintViolation'))) {
      const status = HttpStatus.CONFLICT;
      response.status(status).json({
        statusCode: status,
        message: 'Unique constraint failed',
        error: 'Conflict'
      });
      return;
    }

    if (code === 'P2003' || 
        (exception.message && exception.message.includes('foreign key constraint')) ||
        (exception.cause?.code === '23503') ||
        (exception.cause?.code === '23001')) {
      const status = HttpStatus.BAD_REQUEST;
      response.status(status).json({
        statusCode: status,
        message: exception.cause?.message || 'Foreign key constraint failed',
        error: 'Bad Request'
      });
      return;
    }

    if (code === 'P2025' || (exception.message && exception.message.includes('No record was found'))) {
      const status = HttpStatus.NOT_FOUND;
      response.status(status).json({
        statusCode: status,
        message: 'Record not found',
        error: 'Not Found'
      });
      return;
    }

    // default 500 error code
    super.catch(exception, host);
  }
}

import {  HttpException, HttpStatus } from '@nestjs/common';
export const error = (message)=>{
    throw new HttpException(message || "Error",HttpStatus.BAD_REQUEST)
}
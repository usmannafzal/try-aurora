import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { extname } from 'path';

const validImageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg'];

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      !validImageExtensions.includes(
        extname(value?.originalname).replace('.', ''),
      )
    )
      throw new BadRequestException('file is not a valid file');

    return value;
  }
}

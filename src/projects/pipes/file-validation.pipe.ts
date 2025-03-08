import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private validImageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg'];

  private maxSize = 5 * 1024 * 1024;

  transform(file: any, metadata: ArgumentMetadata) {
    if (
      !this.validImageExtensions.includes(
        extname(file?.originalname).replace('.', ''),
      )
    )
      throw new BadRequestException('File is not a valid file');

    if (file.size > this.maxSize) {
      throw new BadRequestException(
        `File size exceeds the limit of ${this.maxSize / (1024 * 1024)}MB`,
      );
    }

    return file;
  }
}

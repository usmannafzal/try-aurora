import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export class FileStorageHelpers {
  static storeFile() {
    return {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
      fileFilter: this.ValidateFile,
    };
  }

  static ValidateFile(req: any, file: any, callback: any) {
    const validImageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
    if (
      !validImageExtensions.includes(
        extname(file?.originalname).replace('.', ''),
      )
    )
      return callback(
        new BadRequestException(
          'Invalid file type! Only JPEG, PNG, and SVG allowed.',
        ),
        false,
      );

    return callback(null, true);
  }
}

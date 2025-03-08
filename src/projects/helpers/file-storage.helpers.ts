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

  static ValidateFile(_req: any, file: any, callback: any) {
    const maxSize = 5 * 1024 * 1024;
    const validImageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
    if (
      !validImageExtensions.includes(
        extname(file?.originalname).replace('.', ''),
      )
    )
      return callback(
        new Error('Invalid file type! Only JPEG, PNG, and SVG allowed.'),
        false,
      );
    console.log(file.size);
    if (file.size > maxSize)
      return callback(
        new Error(
          `File size exceeds the limit of ${maxSize / (1024 * 1024)}MB`,
        ),
        false,
      );
    return callback(null, true);
  }
}

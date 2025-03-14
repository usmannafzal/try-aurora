import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { FileStorageHelpers } from './helpers/file-storage.helpers';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
          const sanitizedFilename = file.originalname
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9.-]/g, '');
          const filename = `${Date.now()}-${sanitizedFilename}`;
          cb(null, filename);
        },
      }),
      fileFilter: FileStorageHelpers.ValidateFile,
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.projectsService.create(file, body);
  }

  @Get()
  getAll() {
    return this.projectsService.getAll();
  }
}

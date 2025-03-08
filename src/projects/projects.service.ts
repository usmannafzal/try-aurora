import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private repo: Repository<Project>) {}

  create(file: Express.Multer.File, body: any) {
    if (!file) throw new BadRequestException('File is required');

    const filePath = join('uploads', file.filename);

    const project = this.repo.create({
      filePath,
      title: body.title,
      description: body.description,
    });
    return this.repo.save(project);
  }
}

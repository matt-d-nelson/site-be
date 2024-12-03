import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutEntity } from '../models/about.entity/about.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AboutService {
    constructor(
        @InjectRepository(AboutEntity)
        private readonly aboutRepository: Repository<AboutEntity>
    ) {}
}

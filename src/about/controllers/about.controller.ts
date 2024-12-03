import { Controller } from '@nestjs/common';
import { AboutService } from '../services/about.service';

@Controller('about')
export class AboutController {
    constructor(private aboutService: AboutService) {}
}

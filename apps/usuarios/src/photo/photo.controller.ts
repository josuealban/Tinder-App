import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { USER_PATTERNS } from '@app/common/patterns';

@Controller()
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @MessagePattern(USER_PATTERNS.CREATE_PHOTO)
  create(@Payload() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @MessagePattern(USER_PATTERNS.FIND_PHOTOS_BY_USER)
  findByUser(@Payload() userId: number) {
    return this.photoService.findByUser(userId);
  }
}

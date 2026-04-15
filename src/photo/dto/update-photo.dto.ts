import { CreatePhotoDto } from './create-photo.dto';

export class UpdatePhotoDto implements Partial<CreatePhotoDto> {
  url?: string;
  isPrimary?: boolean;
}

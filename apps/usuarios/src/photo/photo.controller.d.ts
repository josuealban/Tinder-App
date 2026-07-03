import { PhotoService } from './photo.service.js';
import { CreatePhotoDto } from './dto/create-photo.dto.js';
import { UpdatePhotoDto } from './dto/update-photo.dto.js';
export declare class PhotoController {
    private readonly photoService;
    constructor(photoService: PhotoService);
    create(createPhotoDto: CreatePhotoDto): Promise<{
        id: number;
        createdAt: Date;
        url: string;
        isPrimary: boolean;
        userId: number;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        url: string;
        isPrimary: boolean;
        userId: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        url: string;
        isPrimary: boolean;
        userId: number;
    }>;
    findByUser(userId: number): Promise<{
        id: number;
        createdAt: Date;
        url: string;
        isPrimary: boolean;
        userId: number;
    }[]>;
    update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<{
        id: number;
        createdAt: Date;
        url: string;
        isPrimary: boolean;
        userId: number;
    }>;
    updatePut(id: number, updatePhotoDto: UpdatePhotoDto): Promise<{
        id: number;
        createdAt: Date;
        url: string;
        isPrimary: boolean;
        userId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        url: string;
        isPrimary: boolean;
        userId: number;
    }>;
}

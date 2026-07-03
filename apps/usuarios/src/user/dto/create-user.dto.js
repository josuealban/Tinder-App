"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const gender_enum_js_1 = require("../../domain/enums/gender.enum.js");
const subscription_tier_enum_js_1 = require("../../domain/enums/subscription-tier.enum.js");
class CreateUserDto {
    email;
    password;
    phone;
    name;
    age;
    bio;
    weight;
    height;
    nationality;
    gender;
    city;
    country;
    zodiacSign;
    seeking;
    location;
    job;
    hobbies;
    spotifyId;
    musicList;
    subscription;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'El email debe tener un formato válido' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre es requerido' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(18, { message: 'Debes tener al menos 18 años' }),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "bio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nationality", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(gender_enum_js_1.Gender),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "zodiacSign", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "seeking", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "job", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "hobbies", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "spotifyId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "musicList", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(subscription_tier_enum_js_1.SubscriptionTier),
    __metadata("design:type", String)
], CreateUserDto.prototype, "subscription", void 0);
//# sourceMappingURL=create-user.dto.js.map
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { GeoLocation } from '../../repository/entities/country.entity';
import { Prop } from '@nestjs/mongoose';

export class CountryCreateRequestDto {
    @ApiProperty({
        required: true,
        type: String,
        description: 'Country name',
        example: faker.location.country(),
        maxLength: 100,
        minLength: 1,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    name: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Country code, Alpha 2 code version',
        example: faker.location.countryCode('alpha-2'),
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(2)
    @MinLength(2)
    @Transform(({ value }) => value.toUpperCase())
    alpha2Code: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Country code, Alpha 3 code version',
        example: faker.location.countryCode('alpha-3'),
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.toUpperCase())
    alpha3Code: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Country code, Numeric code version',
        example: faker.location.countryCode('numeric'),
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(3)
    @MinLength(1)
    numericCode: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Country code, FIPS version',
        example: faker.location.countryCode('alpha-2'),
    })
    @IsNotEmpty()
    @IsString()
    fipsCode: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Country phone code',
        example: [faker.helpers.arrayElement(['62', '65'])],
        maxLength: 4,
        isArray: true,
        default: [],
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    @MaxLength(4, { each: true })
    phoneCode: string[];

    @ApiProperty({
        required: false,
        example: faker.location.country(),
    })
    @IsOptional()
    @IsString()
    continent: string;

    @ApiProperty({
        required: true,
        example: faker.location.timeZone(),
    })
    @IsNotEmpty()
    @IsString()
    timeZone: string;

    @ApiProperty({
        required: false,
        description: 'Top level domain',
        example: faker.internet.domainSuffix(),
    })
    @IsOptional()
    @IsString()
    domain?: string;

    @Prop({ type: Object })
    @IsOptional()
    @ValidateNested()
    @Type(() => Geolocation)
    geo?: GeoLocation;

    @IsOptional()
    @IsString()
    emoji?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

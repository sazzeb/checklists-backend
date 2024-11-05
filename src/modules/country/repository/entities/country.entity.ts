import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import {
    DatabaseEntity,
    DatabaseProp,
    DatabaseSchema,
} from 'src/common/database/decorators/database.decorator';
import { IDatabaseDocument } from 'src/common/database/interfaces/database.interface';
import { AwsS3Dto } from 'src/modules/aws/dtos/aws.s3.dto';
import { AwsS3Schema } from 'src/modules/aws/repository/entities/aws.s3.entity';

export interface GeoLocation {
    lat: number;
    long: number;
}
export const CountryTableName = 'Countries';

@DatabaseEntity({ collection: CountryTableName })
export class CountryEntity extends DatabaseEntityAbstract {
    @DatabaseProp({
        required: true,
        index: true,
        maxlength: 100,
    })
    name: string;

    @DatabaseProp({
        required: true,
        index: true,
        unique: true,
        trim: true,
        uppercase: true,
    })
    alpha2Code: string;

    @DatabaseProp({
        required: false,
        index: true,
        unique: true,
        trim: true,
        uppercase: true,
    })
    alpha3Code: string;

    @DatabaseProp({
        required: true,
        unique: true,
        trim: true,
    })
    numericCode: string;

    @DatabaseProp({
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
    })
    fipsCode: string;

    @DatabaseProp({
        required: true,
        index: true,
        default: [],
        type: [{ type: String, index: true, unique: true, trim: true }],
        maxlength: 20,
    })
    phoneCode: string[];

    @DatabaseProp({
        required: false,
    })
    continent: string;

    @DatabaseProp({
        required: true,
    })
    timeZone: string;

    @DatabaseProp({
        required: false,
    })
    domain?: string;

    @DatabaseProp({
        required: false,
    })
    emoji?: string;

    @DatabaseProp({
        required: false,
    })
    isActive?: boolean;

    @DatabaseProp({
        type: Object,
        required: false,
    })
    geo?: GeoLocation;

    @DatabaseProp({
        required: false,
        schema: AwsS3Schema,
    })
    image?: AwsS3Dto;
}

export const CountrySchema = DatabaseSchema(CountryEntity);
export type CountryDoc = IDatabaseDocument<CountryEntity>;

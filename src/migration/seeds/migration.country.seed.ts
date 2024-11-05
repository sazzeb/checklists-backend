import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CountryService } from 'src/modules/country/services/country.service';
import { CountryCreateRequestDto } from 'src/modules/country/dtos/request/country.create.request.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MigrationCountrySeed {
    constructor(private readonly countryService: CountryService) {}

    @Command({
        command: 'seed:country',
        describe: 'seeds countries',
    })
    async seeds(): Promise<void> {
        try {
            // Load country data from JSON file
            const countriesFilePath = path.join(
                __dirname,
                '../../images/countries.json'
            );
            const countriesData = fs.readFileSync(countriesFilePath, 'utf8');
            const countries = JSON.parse(countriesData);

            // Map the data to match CountryCreateRequestDto
            const data: CountryCreateRequestDto[] = countries
                .filter((country: any) => country.region || country.unicode) // Filter countries where region or unicode exists
                .map((country: any) => ({
                    name: country.name,
                    alpha2Code: country.alpha2,
                    alpha3Code: country.alpha3,
                    domain: country.unicode || 'id', // Assuming 'id' is a placeholder
                    fipsCode: country?.unicode || 'ID', // Assuming 'ID' is a placeholder
                    numericCode: country?.dialCode || '360', // Assuming '360' is a placeholder
                    phoneCode: country?.dialCode || ['62'], // Assuming ['62'] is a placeholder
                    geo: country.geo,
                    continent: country.region,
                    capital: country.capital,
                    emoji: country.emoji,
                    isActive: true,
                    timeZone: country.timezones?.[0] || 'UTC', // Placeholder if no timezone is provided
                }));
            await this.countryService.createMany(data);
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

    @Command({
        command: 'remove:country',
        describe: 'remove countries',
    })
    async remove(): Promise<void> {
        try {
            await this.countryService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}

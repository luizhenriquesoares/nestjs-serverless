import { ApiUseTags, ApiResponse } from "@nestjs/swagger";
import { Controller, Post, Get, Put, Delete, Body } from "@nestjs/common";
import { AirlineDto } from "./airline.dto";
import { AirlineService } from "./airline.service";

@ApiUseTags('airline')
@Controller('airline')
export class AirlineController {
    constructor(private readonly airlineSvc: AirlineService) {}

    @Post('/')
    @ApiResponse({ status: 201, type: AirlineDto })
    async create(@Body() airlineDto: AirlineDto): Promise<AirlineDto> {
        return await this.airlineSvc.create(airlineDto);
    }

    @Get('/')
    @ApiResponse({ status: 200 })
    async list(): Promise<any> {
        return '';
    }

    @Put(':id')
    @ApiResponse({ status: 200 })
    async update(): Promise<any> {
        return '';
    }

    @Delete(':id')
    @ApiResponse({ status: 200 })
    async remove(): Promise<any> {
        return '';
    }
}
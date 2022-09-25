import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UnitsService } from './units.service';
import { Unit } from "./unit.entity";
import { CreateOrUpdateUnitDto, GetUnitDto } from './../Units/unit.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) { }

  @Get()
  getUnits(): Promise<GetUnitDto[]> {
    return this.unitsService.getUnits();
  }

  @Get('/:id')
  getUnitById(@Param('id') id: number): Promise<Unit> {
    return this.unitsService.getUnitById(id);
  }

  @Post()
  createUnit(@Body() createOrUpdateUnitDto: CreateOrUpdateUnitDto): Promise<Unit> {
    return this.unitsService.createUnit(createOrUpdateUnitDto);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() createOrUpdateUnitDto: CreateOrUpdateUnitDto): Promise<UpdateResult> {
    return this.unitsService.editUnit(id, createOrUpdateUnitDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.unitsService.deleteUnitById(id);
  }
}
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CompartmentsService } from './compartments.service';
import { Compartment } from "./compartment.entity";
import { CreateOrUpdateCompartmentDto } from './compartment.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('compartments')
export class CompartmentsController {
  constructor(private readonly compartmentsService: CompartmentsService) { }

  @Get('/:id')
  getCompartmentById(@Param('id') id: number): Promise<Compartment> {
    return this.compartmentsService.getCompartmentById(id);
  }

  @Get()
  getCompartments(@Query() query: { unitId: number }): Promise<Compartment[]> {
    return this.compartmentsService.getCompartmentsByUnitId(query.unitId);
  }

  @Post()
  createCompartment(@Body() CreateOrUpdateCompartmentDto: CreateOrUpdateCompartmentDto): Promise<Compartment> {
    return this.compartmentsService.createCompartment(CreateOrUpdateCompartmentDto);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() CreateOrUpdateCompartmentDto: CreateOrUpdateCompartmentDto): Promise<UpdateResult> {
    return this.compartmentsService.editCompartment(id, CreateOrUpdateCompartmentDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.compartmentsService.deleteCompartmentById(id);
  }
}
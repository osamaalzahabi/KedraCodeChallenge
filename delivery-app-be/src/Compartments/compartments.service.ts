import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrUpdateCompartmentDto } from './compartment.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Compartment } from "./compartment.entity";

@Injectable()
export class CompartmentsService {
  constructor(
    @InjectRepository(Compartment)
    private compartmentsRepository: Repository<Compartment>,
  ) { }

  getCompartmentById(id: number): Promise<Compartment> {
    try {
      return this.compartmentsRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException('Error getting compartment', HttpStatus.BAD_REQUEST);
    }
  }

  getCompartmentsByUnitId(unitId: number): Promise<Compartment[]> {
    try {
      return this.compartmentsRepository.findBy({ unitId });
    } catch (error) {
      throw new HttpException('Error getting compartment(s)', HttpStatus.BAD_REQUEST);
    }
  }

  async createCompartment(createOrUpdateCompartmentDto: CreateOrUpdateCompartmentDto): Promise<Compartment> {
    try {
      return this.compartmentsRepository.save(createOrUpdateCompartmentDto);
    } catch (error) {
      throw new HttpException('Error creating compartment', HttpStatus.BAD_REQUEST);
    }
  }

  editCompartment(id: number, createOrUpdateCompartmentDto: CreateOrUpdateCompartmentDto): Promise<UpdateResult> {
    try {
      let compartment = { ...createOrUpdateCompartmentDto, id };
      return this.compartmentsRepository.update(id, compartment);
    } catch (error) {
      throw new HttpException('Error updating compartment', HttpStatus.BAD_REQUEST);
    }
  }

  deleteCompartmentById(id: number): Promise<DeleteResult> {
    try {
      return this.compartmentsRepository.delete(id);
    } catch (error) {
      throw new HttpException('Error deleting compartment', HttpStatus.BAD_REQUEST);
    }
  }
}

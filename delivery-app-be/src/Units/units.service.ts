import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationsService } from './../Locations/locations.service';
import { CreateOrUpdateUnitDto, GetUnitDto } from './../Units/unit.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Unit } from "./unit.entity";
import { _ } from 'lodash'

@Injectable()
export class UnitsService {

  constructor(
    @InjectRepository(Unit)
    private unitsRepository: Repository<Unit>,
    private locationsService: LocationsService,
  ) { }

  async getUnits(): Promise<GetUnitDto[]> {
    let updatedUnits: GetUnitDto[] = [];
    try {
      const units = await this.unitsRepository.find();
      const locations = await this.locationsService.getLocations();

      _.forEach(units, (unit) => {
        const tempLoc = _.find(locations, (l: any) => { return l.id === parseInt(unit.locationId) });
        const { locationId, ...newUnit } = unit;
        updatedUnits.push({
          ...newUnit,
          location: {
            id: unit.locationId,
            address: tempLoc?.address,
            macAddress: tempLoc?.macAddress
          }
        })
      });
      return updatedUnits;
    } catch (error) {
      throw new HttpException('Error getting unit(s)', HttpStatus.BAD_REQUEST);
    }
  }

  getUnitById(id: number): Promise<Unit> {
    try {
      return this.unitsRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException('Error getting unit', HttpStatus.BAD_REQUEST);
    }
  }

  createUnit(createOrUpdateUnitDto: CreateOrUpdateUnitDto): Promise<Unit> {
    try {
      return this.unitsRepository.save(createOrUpdateUnitDto);
    } catch (error) {
      throw new HttpException('Error creating unit', HttpStatus.BAD_REQUEST);
    }
  }

  async editUnit(id: number, createOrUpdateUnitDto: CreateOrUpdateUnitDto): Promise<UpdateResult> {
    try {
      let unit = { ...createOrUpdateUnitDto, id };
      return this.unitsRepository.update(id, unit);
    } catch (error) {
      throw new HttpException('Error updating unit', HttpStatus.BAD_REQUEST);
    }
  }

  deleteUnitById(id: number): Promise<DeleteResult> {
    try {
      return this.unitsRepository.delete(id);
    } catch (error) {
      throw new HttpException('Error deleting unit', HttpStatus.BAD_REQUEST);
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from "./location.entity";

@Injectable()
export class LocationsService {

  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) { }

  getLocations(): Promise<Location[]> {
    try {
      return this.locationsRepository.find();
    } catch (error) {
      throw new HttpException('Error getting location(s)', HttpStatus.BAD_REQUEST);
    }
  }

  getLocationById(id: number): Promise<Location> {
    try {
      return this.locationsRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException('Error getting location', HttpStatus.BAD_REQUEST);
    }
  }

}

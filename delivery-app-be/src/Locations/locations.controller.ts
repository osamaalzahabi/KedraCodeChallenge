import { Controller, Get, Param } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from "./location.entity";

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) { }

  @Get()
  getLocations(): Promise<Location[]> {
    return this.locationsService.getLocations();
  }

  @Get('/:id')
  getLocationById(@Param('id') id:number): Promise<Location> {
    return this.locationsService.getLocationById(id);
  }

}
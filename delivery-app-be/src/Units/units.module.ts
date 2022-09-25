import { Module } from '@nestjs/common';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from "./unit.entity";
import { LocationsModule } from 'src/Locations/locations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Unit]),
  LocationsModule
],
  controllers: [UnitsController],
  providers: [UnitsService],
  exports: [UnitsService],
})
export class UnitsModule {}

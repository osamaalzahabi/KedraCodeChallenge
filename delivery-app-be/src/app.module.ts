import { Module } from '@nestjs/common';
import { LocationsModule } from './Locations/locations.module';
import { UnitsModule } from './Units/units.module';
import { CompartmentsModule } from './Compartments/compartments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Location } from './Locations/location.entity';
import { Unit } from './Units/unit.entity';
import { Compartment } from './Compartments/compartment.entity';
import { ConfigModule } from '@nestjs/config';
console.log();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Location, Unit, Compartment],
      synchronize: true,
    }),
    LocationsModule,
    UnitsModule,
    CompartmentsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}

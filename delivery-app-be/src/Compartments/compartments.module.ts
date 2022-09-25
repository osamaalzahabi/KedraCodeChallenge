import { Module } from '@nestjs/common';
import { CompartmentsController } from './compartments.controller';
import { CompartmentsService } from './compartments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compartment } from "./compartment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Compartment]),
  ],
  controllers: [CompartmentsController],
  providers: [CompartmentsService],
})
export class CompartmentsModule { }

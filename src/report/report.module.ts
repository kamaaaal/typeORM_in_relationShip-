import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Report,User])
  ],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}

import { Injectable,Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { report } from 'process';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { threadId } from 'worker_threads';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  findbyPrime: any;
  // reportRepository : Repository<Report>

  constructor(
    @InjectRepository(Report)
    private reportRepository : Repository<Report>,
    @InjectRepository(User)
    private userRepository : Repository<User>
    ){
    }
  async create(createReportDto: Partial<Report>) {
    const report = {Content : createReportDto.Content};
    const reportSaved = await this.reportRepository.save(report);
    console.log(reportSaved);
    const userFrom: User = createReportDto.user;
    // const added = await this.reportRepository.save(createReportDto)
    // return added;
    const user = await this.userRepository.findOne({where : {name : userFrom.name}})
    console.log("user : ",user)
    const result = await this.reportRepository.createQueryBuilder()
    .relation(Report,"user").of(report).set(user);
    console.log(result);
    return result;
  }
  
  findAll() {
      // return this.reportRepository.find({relations : ["user"]})
      return this.reportRepository.createQueryBuilder('report')
      .leftJoinAndSelect('report.user','userREL')
      .getMany()
    // return this.reportRepository.find();
  }

  async addReport(report : Report,userName : string){

    const Founduser = await this.userRepository.findOne({where : {name : userName}});
    const createdReport = await this.reportRepository.save(report);
    const res = await this.userRepository.createQueryBuilder()
    .relation(User,"reports").of(Founduser).add(createdReport);
    console.log(res);
  }

  findOne(id: string) {
    return this.reportRepository.createQueryBuilder("report")
    .leftJoinAndSelect('report.user','userREL')
    // .andWhere({id})
    .execute();
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}


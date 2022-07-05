import { IsLatitude, IsLongitude, IsNumber, IsOptional, IsString, Max, MAX, Min, min} from "class-validator";
import { Report } from "../entities/report.entity";


export class CreateReportDto {
    @IsString()
    make : string;

    @IsString()
    model : string;

    @IsNumber()
    // @Min(1930)
    // @Max(2050)
    year : number;

    @IsOptional()
    @IsNumber()
    // @Min(0)
    // @Max(1000000)
    mileage : number;
    
    @IsOptional()
    @IsLongitude()
    lng : number;

    @IsOptional()
    @IsLatitude()
    lat : number;
 
    @IsNumber()
    // @Min(0)
    // @Max(1000000)
    price : number;
}
export class createReport implements Partial<Report>
{

}
 
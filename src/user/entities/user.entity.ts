import { Report } from "src/report/entities/report.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({
    name : "userREl"
})
export class User {
    @PrimaryGeneratedColumn()
    id : string;


    @Column({
        unique : true
    })
    name : string;

    @Column()
    password : string;

    @OneToMany(() => Report,(report:Report) => report.user,{
        // eager : true,
    })
    reports : Report[]
}
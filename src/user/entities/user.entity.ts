import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    id: number;

    @Column()
    fname: string;

    @Column()
    lname: string;

    @Column()
    age: number;

}

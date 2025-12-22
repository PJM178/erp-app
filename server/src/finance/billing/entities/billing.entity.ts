import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("billings")
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: string;

  @Column("decimal", { precision: 12, scale: 2 })
  amount: number;

  // @Column()
  // currency: string;

  // @Column()
  // status: string;
}

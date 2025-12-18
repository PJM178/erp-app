import { RefreshToken } from "src/auth/entities/refresh-token.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", unique: true, default: () => "uuid_generate_v4()" })
  uuid: string;

  @Column({ nullable: true, name: "first_name" })
  firstName: string;

  @Column({ nullable: true, name: "last_name" })
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ default: true, name: "is_active" })
  isActive: boolean;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens: RefreshToken[];
}

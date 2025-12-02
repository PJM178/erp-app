import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { HashService } from "src/common/hash/hash.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });

    return user;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ username });

    return user;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);

    return (result.affected || 0) > 0;
  }

  async create(dto: CreateUserDto): Promise<Partial<CreateUserDto>> {
    try {
      const hashedPassword = await this.hashService.hashValue(dto.password);
      const user = this.usersRepository.create({
        ...dto,
        password: hashedPassword,
      });
      const result = await this.usersRepository.save(user);

      return result;
    } catch (err) {
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code?: string }).code === "23505"
      ) {
        throw new ConflictException(
          `User with username '${dto.username}' already exists`,
        );
      }

      throw err;
    }
  }
}

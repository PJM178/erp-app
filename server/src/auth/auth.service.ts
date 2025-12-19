import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "src/common/hash/hash.service";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async signIn(
    username: string,
    userPassword: string,
  ): Promise<{ access_token: string; user?: Partial<User> }> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await this.hashService.compareValue(
      userPassword,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.uuid };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        uuid: user.uuid,
      },
    };
  }
}

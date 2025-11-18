import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    userPassword: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUsername(username);

    if (user?.password !== userPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.uuid, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}

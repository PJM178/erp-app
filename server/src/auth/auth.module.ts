import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RefreshToken } from "./entities/refresh-token.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        signOptions: { expiresIn: "1h" },
        secret: config.get("JWT_SECRET"),
      }),
      global: true,
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}

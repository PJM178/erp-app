import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { UsersService } from "./users/users.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      // Even though the module is global, it should still be imported since it's possible that it's resolved later
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get("PGHOST"),
        port: config.get("PGPORT") || 5000,
        username: config.get("PGUSER"),
        password: config.get("PGPASSWORD"),
        database: config.get("PGDATABASE"),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly usersService: UsersService) {}

  async onApplicationBootstrap() {
    const admin = await this.usersService.findOneByUsername("admin");

    if (!admin) {
      console.log("Seeding users...");
      const admin = await this.usersService.create({
        username: "admin",
        password: "admin",
      });
      console.log("User created: ", admin);
      console.log("Users seeded");
    }
  }
}

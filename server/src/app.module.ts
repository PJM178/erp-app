import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { HashModule } from "./common/hash/hash.module";
import { DataSource } from "typeorm";
import { HashService } from "./common/hash/hash.service";

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
        port: config.get("PGPORT") || 7000,
        username: config.get("PGUSER"),
        password: config.get("PGPASSWORD"),
        database: config.get("PGDATABASE"),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    AuthModule,
    HashModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashService: HashService,
  ) {}

  async onApplicationBootstrap() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const usernames = ["admin", "bob"];

      const placeholders = usernames.map((_, i) => `$${i + 1}`).join(", ");

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const users = await queryRunner.query(
        `SELECT * FROM users WHERE username IN (${placeholders})`,
        usernames,
      );

      if (users.length === 0) {
        console.log("Seeding users...");

        await queryRunner.query(
          `
            INSERT INTO users (username, password, "first_name", "last_name", email)
            VALUES 
              ($1, $2, $3, $4, $5),
              ($6, $7, $8, $9, $10)
          `,
          [
            // eslint-disable-next-line prettier/prettier
            "admin", await this.hashService.hashValue("admin"), "Jorma", "Korva", "admin@admin.com",
            // eslint-disable-next-line prettier/prettier
            "bob", await this.hashService.hashValue("bob"), "Korva", "Jorma", "bob@bob.com",
          ],
        );

        console.log("Users seeded");
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error(err);
    } finally {
      await queryRunner.release();
    }
  }
}

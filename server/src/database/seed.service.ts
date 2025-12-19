import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DataSource } from "typeorm";
import { HashService } from "src/common/hash/hash.service";
import { isProduction } from "src/common/env/bootstrap-env";

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashService: HashService,
  ) {}

  async onApplicationBootstrap() {
    if (isProduction()) return;

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
            "admin", await this.hashService.hashValue("admin"), "Jorma", "Korva", "admin@email.com",
            // eslint-disable-next-line prettier/prettier
            "bob", await this.hashService.hashValue("bob"), "Korva", "Jorma", "bob@email.com",
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

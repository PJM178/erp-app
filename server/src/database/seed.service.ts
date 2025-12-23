import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DataSource } from "typeorm";
import { HashService } from "src/common/hash/hash.service";
import { isProduction } from "src/common/env/bootstrap-env";
import { User } from "src/users/entities/user.entity";
import { QueryRunner } from "typeorm/browser";
import { Billing } from "src/finance/billing/entities/billing.entity";

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private static readonly USERS_TO_INSERT = 50;
  private static readonly BILLINGS_TO_INSERT = 50;

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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const userCount = await queryRunner.query(
        `
          SELECT COUNT(*) FROM users;
        `,
      );

      if (!+userCount[0].count) {
        console.log("Seeding users...");

        const usersToInsert = [
          {
            username: "admin",
            password: "admin",
            firstName: "Jorma",
            lastName: "Korva",
            email: "admin@email.com",
          },
        ];

        for (let i = 0; i < SeedService.USERS_TO_INSERT; i++) {
          const user = {
            username: "user" + i,
            password: "user" + i,
            firstName: "user" + i,
            lastName: "user" + i,
            email: `${"user" + i}@email.com`,
          };

          usersToInsert.push(user);
        }

        await Promise.all(
          usersToInsert.map(async (user) => {
            user.password = await this.hashService.hashValue(user.password);
          }),
        );

        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(User)
          .values(usersToInsert)
          .orIgnore()
          .execute();

        console.log("Users seeded");

        await this.seedBillings(queryRunner);

        console.log("Billings seeded");
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error(err);
    } finally {
      await queryRunner.release();
    }
  }

  async seedBillings(queryRunner: QueryRunner) {
    const valuesToInsert = [];

    for (let i = 0; i < SeedService.BILLINGS_TO_INSERT; i++) {
      const billing = {
        customerId: "1",
        amount: Math.random() * 1000,
      };

      valuesToInsert.push(billing);
    }

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Billing)
      .values(valuesToInsert)
      .orIgnore()
      .execute();
  }
}

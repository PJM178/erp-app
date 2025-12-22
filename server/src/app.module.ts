import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { HashModule } from "./common/hash/hash.module";
import { SeedModule } from "./database/seed.module";
import { isProduction } from "./common/env/bootstrap-env";
import { isProductionFromConfig } from "./common/env/config-env";
import { BillingModule } from "./finance/billing/billing.module";

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
        synchronize: !isProductionFromConfig(config),
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    AuthModule,
    HashModule,
    BillingModule,
    ...(!isProduction() ? [SeedModule] : []),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

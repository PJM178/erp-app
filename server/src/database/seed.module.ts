import { Module } from "@nestjs/common";
import { HashModule } from "src/common/hash/hash.module";
import { SeedService } from "./seed.service";

@Module({
  imports: [HashModule],
  providers: [SeedService],
})
export class SeedModule {}

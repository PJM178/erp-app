import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global path - there are options, for example, to exclude certain paths
  app.setGlobalPrefix("api");

  await app.listen(process.env.PORT || 3000);
}

bootstrap().catch((err) => {
  console.log("Something went wrong bootstrapping the server", err);
});

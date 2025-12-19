import { ConfigService } from "@nestjs/config";

export const isProductionFromConfig = (config: ConfigService): boolean => {
  return config.get("NODE_ENV") === "production";
};

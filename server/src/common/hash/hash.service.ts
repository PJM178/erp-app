import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashService {
  private readonly saltRounds = 10;

  async hashValue(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds);
  }

  async compareValue(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}

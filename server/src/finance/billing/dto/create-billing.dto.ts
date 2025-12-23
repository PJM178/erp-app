import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateBillingDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

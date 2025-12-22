import { Injectable } from "@nestjs/common";
import { CreateBillingDto } from "./dto/create-billing.dto";
import { UpdateBillingDto } from "./dto/update-billing.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Billing } from "./entities/billing.entity";
import { Repository } from "typeorm";

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private billingsReposity: Repository<Billing>,
  ) {}

  create(createBillingDto: CreateBillingDto) {
    return "This action adds a new billing";
  }

  findAll() {
    return `This action returns all billing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billing`;
  }

  update(id: number, updateBillingDto: UpdateBillingDto) {
    return `This action updates a #${id} billing`;
  }

  remove(id: number) {
    return `This action removes a #${id} billing`;
  }
}

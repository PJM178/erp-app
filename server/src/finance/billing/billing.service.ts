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
    private billingsRepository: Repository<Billing>,
  ) {}

  async create(createBillingDto: CreateBillingDto) {
    const billingEntity = this.billingsRepository.create(createBillingDto);
    const savedBillingEntity = await this.billingsRepository.save(billingEntity);
    console.log(savedBillingEntity);
    return savedBillingEntity;
  }

  async findAll() {
    const allBillings = await this.billingsRepository.find();
    const test = await this.create({ customerId: "1", amount: 42069 });
    console.log(allBillings);
    console.log("created new billing", test);
    return allBillings;
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

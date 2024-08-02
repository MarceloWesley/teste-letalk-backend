import { IsNumber, IsString } from "class-validator";
import { IsValidCPF } from "../decorators";

export class CreateLoanDTO {
  @IsString()
  @IsValidCPF()
  public cpf: string;

  @IsString()
  public uf: string;

  @IsString()
  public birthdate: Date;

  @IsNumber()
  public loan_amount: number;

  @IsNumber()
  public desired_payment: number;
}

import { CreateLoanDTO } from "../dtos";
import { sql } from "../lib";

const createOne = async (dto: CreateLoanDTO) => {
  const { cpf, uf, birthdate, desired_payment, loan_amount } = dto;

  const result =
    await sql`INSERT INTO loans (cpf, uf, birthdate, loan_amount, desired_payment)
    VALUES (${cpf}, ${uf.toLocaleLowerCase()}, ${birthdate}, ${loan_amount}, ${desired_payment})
    RETURNING *`;
  return result;
};

const findAll = async () => {
  const result = await sql`select * from loans`;

  return result;
};

export { createOne, findAll };

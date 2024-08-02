import { CreateLoanDTO } from "../dtos";
import { query } from "../lib";

const createOne = async (dto: CreateLoanDTO) => {
  const { cpf, uf, birthdate, desired_payment, loan_amount } = dto;

  const insertQuery = `
    INSERT INTO loans (cpf, uf, birthdate, loan_amount, desired_payment)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const result = await query(insertQuery, [
    cpf,
    uf.toLocaleLowerCase(),
    birthdate,
    loan_amount,
    desired_payment,
  ]);

  return result;
};

const findAll = async () => {
  const insertQuery = `SELECT * from loans`;

  const result = await query(insertQuery);

  return result;
};

export { createOne, findAll };

import { Request, Response, NextFunction } from "express";
import { CreateLoanDTO } from "../dtos";
import { validateOrReject } from "class-validator";

export const createLoanValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Missing request body!" });
    }

    const { cpf, uf, birthdate, loan_amount, desired_payment } = req.body;

    const loan = new CreateLoanDTO();
    loan.cpf = cpf;
    loan.uf = uf;
    loan.birthdate = birthdate;
    loan.loan_amount = loan_amount;
    loan.desired_payment = desired_payment;

    await validateOrReject(loan);

    next();
  } catch (e: any) {
    const message = Object.values(e[0].constraints)[0];
    res.status(400).send({ message });
  }
};

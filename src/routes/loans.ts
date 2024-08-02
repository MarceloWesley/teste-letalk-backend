import { Router } from "express";
import { LoansController } from "../controllers";
import { createLoanValidator } from "../middleware";

export const loansRoutes = Router();

const controller = new LoansController();

loansRoutes.get("/loans", controller.findAll);

loansRoutes.post("/loans", createLoanValidator, controller.createOne);

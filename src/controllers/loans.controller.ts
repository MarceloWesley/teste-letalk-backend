import { type Request, type Response } from "express";
import { createOne, findAll } from "../service";

export class LoansController {
  public constructor() {}

  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const response = await findAll();
      return res.status(200).json({ data: response.rows });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Error on get loans",
        error: error.message,
      });
    }
  }

  public async createOne(req: Request, res: Response): Promise<Response> {
    try {
      const response = await createOne(req.body);
      return res.status(200).json({ data: response.rows });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Error on post loan",
        error: error.message,
      });
    }
  }
}

import { Request, Response } from 'express';
import MotorcycleService from '../Services/Motorcycle.service';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private service: MotorcycleService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new MotorcycleService();
  }

  public async create() {
    const { body } = this.req;

    const newMotorcycle = await this.service.createNewMotorcycle(body);
    return this.res.status(201).json(newMotorcycle);
  }
}

export default MotorcycleController;
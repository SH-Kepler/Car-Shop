import { Request, Response } from 'express';
import CarService from '../Services/Car.service';

class CarController {
  private req: Request;
  private res: Response;
  private service: CarService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new CarService();
  }

  public async create() {
    const { body } = this.req;

    const newCar = await this.service.createNewCar(body);
    return this.res.status(201).json(newCar);
  }

  public async findAll() {
    const cars = await this.service.findAllCars();
    return this.res.status(200).json(cars);
  }

  public async findById() {
    const { id } = this.req.params;

    const { status, message, response } = await this.service.findCarById(id);
    if (message) return this.res.status(status).json({ message });
    return this.res.status(status).json(response);
  }

  public async update() {
    const { id } = this.req.params;
    const { body } = this.req;

    const { status, message, response } = await this.service.updateCar(id, body);
    if (message) return this.res.status(status).json({ message });
    return this.res.status(status).json(response);
  }
}

export default CarController;
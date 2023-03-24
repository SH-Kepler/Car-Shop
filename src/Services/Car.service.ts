import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/Car.model';

class CarService {
  public async createNewCar(car: ICar) {
    const carODM = new CarModel();
    const newCar = await carODM.create(car);
    return new Car(newCar);
  }

  public async findAllCars() {
    const carODM = new CarModel();
    const cars = await carODM.findAll();
    const response = cars.map((i) => new Car(i));
    return response;
  }

  public async findCarById(id: string) {
    const carODM = new CarModel();
    if (!isValidObjectId(id)) return { status: 422, message: 'Invalid mongo id' };
    const car = await carODM.findById(id);
    if (!car) return { status: 404, message: 'Car not found' };
    return { status: 200, response: new Car(car) };
  }

  public async updateCar(id: string, car: ICar) {
    const carODM = new CarModel();
    if (!isValidObjectId(id)) return { status: 422, message: 'Invalid mongo id' };
    const toUpdateCar = await carODM.update(id, car);
    if (!toUpdateCar) return { status: 404, message: 'Car not found' };
    return { status: 200, response: new Car(toUpdateCar) };
  }
}

export default CarService;
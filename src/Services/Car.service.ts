import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/Car.model';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(
        { id: car.id,
          model: car.model,
          year: car.year,
          color: car.color,
          status: car.status,
          buyValue: car.buyValue,
          doorsQty: car.doorsQty,
          seatsQty: car.seatsQty },
      );
    }
    return null;
  }

  public async createNewCar(car: ICar) {
    const carODM = new CarModel();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
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
}

export default CarService;
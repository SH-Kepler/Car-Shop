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
}

export default CarService;
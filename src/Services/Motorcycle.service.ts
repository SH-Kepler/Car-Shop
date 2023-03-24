import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleModel from '../Models/Schemas/Motorcycle.model';

class MotorcycleService {
  public async createNewMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleModel();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return new Motorcycle(newMotorcycle);
  }
}

export default MotorcycleService;
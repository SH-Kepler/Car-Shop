import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleModel from '../Models/Schemas/Motorcycle.model';

class MotorcycleService {
  public async createNewMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleModel();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return new Motorcycle(newMotorcycle);
  }

  public async findAllMotorcycles() {
    const motorcycleODM = new MotorcycleModel();
    const motorcycles = await motorcycleODM.findAll();
    const response = motorcycles.map((i) => new Motorcycle(i));
    return response;
  }

  public async findMotorcycleById(id: string) {
    const motorcycleODM = new MotorcycleModel();
    if (!isValidObjectId(id)) return { status: 422, message: 'Invalid mongo id' };
    const motorcycle = await motorcycleODM.findById(id);
    if (!motorcycle) return { status: 404, message: 'Motorcycle not found' };
    return { status: 200, response: new Motorcycle(motorcycle) };
  }
}

export default MotorcycleService;
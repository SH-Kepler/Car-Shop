import { Router } from 'express';
import CarController from '../Controllers/Car.controller';
import MotorcycleController from '../Controllers/Motorcycle.controller';

const routes = Router();

routes.post(
  '/cars',
  (req, res) => new CarController(req, res).create(),
);

routes.get(
  '/cars',
  (req, res) => new CarController(req, res).findAll(),
);

routes.get(
  '/cars/:id',
  (req, res) => new CarController(req, res).findById(),
);

routes.put(
  '/cars/:id',
  (req, res) => new CarController(req, res).update(),
);

routes.post(
  '/motorcycles',
  (req, res) => new MotorcycleController(req, res).create(),
);

routes.get(
  '/motorcycles',
  (req, res) => new MotorcycleController(req, res).findAll(),
);

routes.get(
  '/motorcycles/:id',
  (req, res) => new MotorcycleController(req, res).findById(),
);

export default routes;
import { Router } from 'express';
import CarController from '../Controllers/Car.controller';

const routes = Router();

routes.post(
  '/cars',
  (req, res) => new CarController(req, res).create(),
);
routes.get(
  '/cars',
  (req, res) => new CarController(req, res).findAll(),
);

export default routes;
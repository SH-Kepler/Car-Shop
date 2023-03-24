import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import { describe } from 'mocha';
import CarService from '../../../src/Services/Car.service';
import ICar from '../../../src/Interfaces/ICar';

describe('testa a camada service de Car', function () {
  describe('testa se a funciona', function () {
    it('adiciona um novo carro no db', async function () {
      const carToRegister: ICar = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };
      const registeredCar: ICar = {
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };
      sinon.stub(Model, 'create').resolves(registeredCar);
  
      const carService = new CarService();
      const response = await carService.createNewCar(carToRegister);
  
      expect(response).to.be.deep.equal(registeredCar);
    });

    it('Lista todos os carros', async function () {
      const registeredCars: ICar[] = [
        {
          id: '6348513f34c397abcad040b2',
          model: 'Marea',
          year: 2002,
          color: 'Black',
          status: true,
          buyValue: 15.990,
          doorsQty: 4,
          seatsQty: 5,
        },
        {
          id: '634852326b35b59438fbea31',
          model: 'Tempra',
          year: 1995,
          color: 'Black',
          status: true,
          buyValue: 39,
          doorsQty: 2,
          seatsQty: 5,
        },
      ];
      sinon.stub(Model, 'find').resolves(registeredCars);
  
      const carService = new CarService();
      const response = await carService.findAllCars();
  
      expect(response).to.be.deep.equal(registeredCars);
    });
  
    it('Encontra um carro buscado pelo id', async function () {
      const registeredCar: ICar = {
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };
      sinon.stub(Model, 'findById').resolves(registeredCar);
  
      const carService = new CarService();
      const response = await carService.findCarById('6348513f34c397abcad040b2');
  
      expect(response).to.be.deep.equal({ status: 200, response: registeredCar });
    });

    it('Atualiza um carro pelo id', async function () {
      const carToUpdate: ICar = {
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: true,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      };
      const updatedCar: ICar = {
        id: '6348513f34c397abcad040b2',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: true,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      };
      sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedCar);
  
      const carService = new CarService();
      const response = await carService.updateCar('6348513f34c397abcad040b2', carToUpdate);
  
      expect(response).to.be.deep.equal({ status: 200, response: updatedCar });
    });
  });

  describe('testa erros do findCarById', function () {
    it('erro caso o id informado seja inválido na função de findCarById', async function () {
      sinon.stub(Model, 'findById').resolves();
  
      try {
        const carService = new CarService();
        await carService.findCarById('batatinhaquandonasce');
      } catch (e) {
        expect((e as Error).message).to.be.equal('Invalid mongo id');
      }
    });
  
    it('erro caso não seja encontrado nenhum carro na função de findCarById', async function () {
      sinon.stub(Model, 'findById').resolves();
  
      try {
        const carService = new CarService();
        await carService.findCarById('6348513f34c397abcad040b2');
      } catch (e) {
        expect((e as Error).message).to.be.equal('Car not found');
      }
    });
  });

  describe('testa erros do updateCar', function () {
    it('erro caso o id informado seja inválido na função de updateCar', async function () {
      const carToUpdate = {
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: true,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      };

      sinon.stub(Model, 'findByIdAndUpdate').resolves();

      try {
        const carService = new CarService();
        await carService.updateCar('batatinhaquandonasce', carToUpdate);
      } catch (e) {
        expect((e as Error).message).to.be.equal('Invalid mongo id');
      }
    });

    it('erro caso não seja encontrado nenhum carro na função de updateCar', async function () {
      const carToUpdate = {
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: true,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      };

      sinon.stub(Model, 'findByIdAndUpdate').resolves();

      try {
        const carService = new CarService();
        await carService.updateCar('6348513f34c397abcad040b2', carToUpdate);
      } catch (e) {
        expect((e as Error).message).to.be.equal('Car not found');
      }
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
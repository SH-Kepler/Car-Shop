import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import { describe } from 'mocha';
import MotorcycleService from '../../../src/Services/Motorcycle.service';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

describe('testa a camada service de Motorcycle', function () {
  const modelMotorcycle = 'Honda Cb 600f Hornet';
  describe('testa se a funciona', function () {
    it('adiciona uma nova moto no db', async function () {
      const motorcycleToRegister: IMotorcycle = {
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
      const registeredMotorcycle: IMotorcycle = {
        id: '6348513f34c397abcad040b2',
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
      sinon.stub(Model, 'create').resolves(registeredMotorcycle);
  
      const motorcycleService = new MotorcycleService();
      const response = await motorcycleService.createNewMotorcycle(motorcycleToRegister);
  
      expect(response).to.be.deep.equal(registeredMotorcycle);
    });

    it('Lista todas as motos', async function () {
      const registeredMotorcycles: IMotorcycle[] = [
        {
          id: '6348513f34c397abcad040b2',
          model: modelMotorcycle,
          year: 2005,
          color: 'Yellow',
          status: true,
          buyValue: 30.000,
          category: 'Street',
          engineCapacity: 600,
        },
        {
          id: '634852326b35b59438fbea31',
          model: 'Honda Cbr 1000rr',
          year: 2011,
          color: 'Orange',
          status: true,
          buyValue: 59.900,
          category: 'Street',
          engineCapacity: 1000,
        },
      ];
      sinon.stub(Model, 'find').resolves(registeredMotorcycles);
  
      const motorcycleService = new MotorcycleService();
      const response = await motorcycleService.findAllMotorcycles();
  
      expect(response).to.be.deep.equal(registeredMotorcycles);
    });
  
    it('Encontra uma moto buscada pelo id', async function () {
      const registeredMotorcycle: IMotorcycle = {
        id: '6348513f34c397abcad040b2',
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
      sinon.stub(Model, 'findById').resolves(registeredMotorcycle);
  
      const motorcycleService = new MotorcycleService();
      const response = await motorcycleService.findMotorcycleById('6348513f34c397abcad040b2');
  
      expect(response).to.be.deep.equal({ status: 200, response: registeredMotorcycle });
    });

    it('Atualiza uma moto pelo id', async function () {
      const motorcycleToUpdate: IMotorcycle = {
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
      const updatedMotorcycle: IMotorcycle = {
        id: '6348513f34c397abcad040b2',
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedMotorcycle);
  
      const motorcycleService = new MotorcycleService();
      const response = await motorcycleService
        .updateMotorcycle('6348513f34c397abcad040b2', motorcycleToUpdate);
  
      expect(response).to.be.deep.equal({ status: 200, response: updatedMotorcycle });
    });
  });

  describe('testa erros do findMotorcycleById', function () {
    it('erro caso o id informado seja inválido na função de findMotorcycleById', async function () {
      sinon.stub(Model, 'findById').resolves();
  
      try {
        const motorcycleService = new MotorcycleService();
        await motorcycleService.findMotorcycleById('batatinhaquandonasce');
      } catch (e) {
        expect((e as Error).message).to.be.equal('Invalid mongo id');
      }
    });
  
    it('erro caso não seja encontrado nenhuma moto em findMotorcycleById', async function () {
      sinon.stub(Model, 'findById').resolves();
  
      try {
        const motorcycleService = new MotorcycleService();
        await motorcycleService.findMotorcycleById('6348513f34c397abcad040b2');
      } catch (e) {
        expect((e as Error).message).to.be.equal('Motorcycle not found');
      }
    });
  });

  describe('testa erros do updateMotorcycle', function () {
    it('erro caso o id informado seja inválido na função de updateMotorcycle', async function () {
      const motorcycleToUpdate: IMotorcycle = {
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      sinon.stub(Model, 'findByIdAndUpdate').resolves();

      try {
        const motorcycleService = new MotorcycleService();
        await motorcycleService.updateMotorcycle('batatinhaquandonasce', motorcycleToUpdate);
      } catch (e) {
        expect((e as Error).message).to.be.equal('Invalid mongo id');
      }
    });

    it('erro caso não seja encontrado nenhuma moto em updateMotorcycle', async function () {
      const motorcycleToUpdate: IMotorcycle = {
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      sinon.stub(Model, 'findByIdAndUpdate').resolves();

      try {
        const motorcycleService = new MotorcycleService();
        await motorcycleService.updateMotorcycle('6348513f34c397abcad040b2', motorcycleToUpdate);
      } catch (e) {
        expect((e as Error).message).to.be.equal('Motorcycle not found');
      }
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
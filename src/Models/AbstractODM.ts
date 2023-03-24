import { model, Model, models, Schema, UpdateQuery } from 'mongoose';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(item: T): Promise<T> {
    return this.model.create({ ...item });
  }

  public async findAll(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | undefined | null> {
    return this.model.findById(id);
  }

  public async update(id: string, item: T): Promise<T | undefined | null> {
    return this.model.findByIdAndUpdate(id, { ...item } as UpdateQuery<T>, { new: true });
  }
}
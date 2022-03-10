import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {

  specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description });
    this.specifications.push(specification);

    return specification;
  }

  async list(): Promise<Specification[]> {
    const all = this.specifications;
    return all;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(specification => specification.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter(s => ids.includes(s.id));
    return allSpecifications;
  }

}

export { SpecificationRepositoryInMemory }
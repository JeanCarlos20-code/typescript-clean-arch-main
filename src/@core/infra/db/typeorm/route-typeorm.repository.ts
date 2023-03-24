import { RouteRepositoryInterface } from 'src/@core/domain/route.repository';
import { Repository } from 'typeorm';
import { Route } from '../../../domain/route.entity';

export class RouteTypeOrmRepository implements RouteRepositoryInterface {
  constructor(private ormRepo: Repository<Route>) {}

  async insert(route: Route): Promise<void> {
    await this.ormRepo.save(route);
  }
  findAll(): Promise<Route[]> {
    return this.ormRepo.find();
  }
}

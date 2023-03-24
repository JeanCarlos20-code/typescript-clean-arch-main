import { Route } from '../../../domain/route.entity';
import { DataSource } from 'typeorm';
import { RouteSchema } from './route.schema';

describe('RouteSchema Tests', () => {
  test('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [RouteSchema],
    });
    await dataSource.initialize();
    const route = Route.create({
      title: 'minha rota',
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
      points: [
        { lat: 1, lng: 2 },
        { lat: 3, lng: 4 },
      ],
    });
    const routeRepo = dataSource.getRepository(Route);
    await routeRepo.save(route);
    // console.log(await routeRepo.findOneBy({ id: route.id }));
  });
});

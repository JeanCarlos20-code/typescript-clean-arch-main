import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { CreateRouteUseCase } from 'src/@core/application/create-route.use-case';
import { RouteRepositoryInterface } from 'src/@core/domain/route.repository';
import { ListAllRoutesUseCase } from 'src/@core/application/list-all-routes.use-case';
import { RouteInMemoryRepository } from 'src/@core/infra/db/in-memory/route-in-memory.repository';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm/dist';
import { RouteSchema } from 'src/@core/infra/db/typeorm/route.schema';
import { RouteTypeOrmRepository } from 'src/@core/infra/db/typeorm/route-typeorm.repository';
import { DataSource } from 'typeorm';
import { Route } from 'src/@core/domain/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteSchema])],
  controllers: [RoutesController],
  providers: [
    RoutesService,
    {
      provide: RouteTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new RouteTypeOrmRepository(dataSource.getRepository(Route));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: RouteInMemoryRepository,
      useClass: RouteInMemoryRepository, // irá funcionar como um new (instanciar)
    },
    {
      provide: CreateRouteUseCase,
      useFactory: (routeRepo: RouteRepositoryInterface) => {
        return new CreateRouteUseCase(routeRepo); // useFactory irá configurar uma fabricação de um objeto
      },
      inject: [RouteTypeOrmRepository], // numero de parâmetros correspondente que vai receber
    },
    {
      provide: ListAllRoutesUseCase,
      useFactory: (routeRepo: RouteRepositoryInterface) => {
        return new ListAllRoutesUseCase(routeRepo); // useFactory irá configurar uma fabricação de um objeto
      },
      inject: [RouteTypeOrmRepository], // numero de parâmetros correspondente que vai receber
    },
  ],
})
export class RoutesModule {}

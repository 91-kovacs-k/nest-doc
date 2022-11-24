import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm';
import { UsersController } from './controllers/users/users.controller';
import { FakeAuthMiddleware } from './middlewares/fake-auth/fake-auth.middleware';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, FakeAuthMiddleware)
      // .exclude('users/query/*')
      // .forRoutes('users');
      // .forRoutes({ path: 'users', method: RequestMethod.POST });
      .forRoutes(UsersController);
  }
}

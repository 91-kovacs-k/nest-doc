import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'SA',
      password: 'notPassword123',
      database: 'proba',
      synchronize: true,
      logging: false,
      entities: entities,
      migrations: [],
      subscribers: [],
      options: { encrypt: false },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

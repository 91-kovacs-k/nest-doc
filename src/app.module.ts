import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

const DBHOST = process.env.DBHOST || 'localhost';
console.log(DBHOST);
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: DBHOST,
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
    AuthModule,
    PassportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

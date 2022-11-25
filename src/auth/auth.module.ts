import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    { provide: 'APP_GUARD', useClass: JwtAuthGuard },
  ],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

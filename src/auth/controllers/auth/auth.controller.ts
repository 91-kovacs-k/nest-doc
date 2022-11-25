import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth/local-auth.guard';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { SerializedUser } from 'src/users/types/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Req() req: Request) {
    // return req.user;
    console.log(req.user);
    return this.authService.login(req.user as SerializedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  proba(@Req() req: Request) {
    return req.user;
  }
}

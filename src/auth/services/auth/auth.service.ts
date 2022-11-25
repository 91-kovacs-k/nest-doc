import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser, User } from 'src/users/types/user';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.fetchByUsername(username);
    // if (user && user.password === password) {
    if (user && comparePasswords(password, user.password)) {
      // const { password, ...result } = user;
      const result = new SerializedUser(user);
      return result;
    }
    return null;
  }

  async login(user: SerializedUser) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

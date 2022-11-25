import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { SerializedUser, User } from 'src/users/types/user';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private users: User[] = [
    {
      id: 1,
      username: 'Dávid',
      password: 'jelszo',
      age: 28,
      email: 'david@gmail.com',
    },
    {
      id: 2,
      username: 'Milán',
      password: 'pass',
      age: 42,
      email: 'milan@gmail.com',
    },
    {
      id: 3,
      username: 'Júlia',
      password: 'password',
      age: 22,
      email: 'julia@gmail.com',
    },
  ];

  async fetchAll() {
    // return this.users.map((u) => new SerializedUser(u));
    return (await this.userRepository.find()).map((u) => new SerializedUser(u));
  }

  async insert(user: CreateUserDto) {
    // const id = this.users[this.users.length - 1].id + 1;
    // const newUser: User = { id, ...user };
    // this.users.push(newUser);

    // await this.userRepository.save(user)

    const password = encodePassword(user.password);
    await this.userRepository.save({ ...user, password });
  }

  async fetchById(id: number) {
    // return this.users.filter((user) => user.id === id);

    // return plainToClass(
    //   SerializedUser,
    //   this.users.find((user) => user.id === id),
    // );

    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return plainToClass(SerializedUser, user);
    }
  }

  fetchWithQuery(maxAge: number) {
    return this.users.filter((user) => user.age <= maxAge);
  }

  async fetchByUsername(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async remove(id: number) {
    const user = await this.fetchById(id);
    console.log(id);
    console.log(user);
    if (!user) {
      throw new NotFoundException();
    }
    return await this.userRepository.remove(user);
  }
}

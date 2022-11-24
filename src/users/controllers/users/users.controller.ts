import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { ExampleFilter } from 'src/users/filters/example/example.filter';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    // const users = this.usersService.fetchAll();
    const users = await this.usersService.fetchAll();
    if (users.length === 0) {
      throw new HttpException('no user in database', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  @Post()
  create(@Req() req: Request, @Res() res: Response) {
    this.usersService.insert(req.body);
    res.sendStatus(201);
  }

  @Post('nest')
  @UsePipes(ValidationPipe)
  async createNest(@Body() userDetails: CreateUserDto) {
    // this.usersService.insert(userDetails);
    await this.usersService.insert(userDetails);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    // console.log(id);
    // console.log(typeof id);
    const user = this.usersService.fetchById(id);
    if (!user) {
      // throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Get('/query/age')
  @UseFilters(ExampleFilter)
  findWithQuery(@Query('max', ParseIntPipe) max: number) {
    const users = this.usersService.fetchWithQuery(max);
    if (users.length === 0) {
      throw new HttpException(
        'users not found with specified query',
        HttpStatus.NOT_FOUND,
      );
    }
    return users;
  }
}

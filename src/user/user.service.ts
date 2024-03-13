import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}
  onModuleInit() {
    const secretKey = 'ASD12JD12M0,9-D1S21';
    const payload = {
      userId: '123',
      username: 'testuser',
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    console.log('example token:', token);
  }

  async addUser(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async getUser(id: number) {
    return this.userModel.findByPk(id);
  }
}

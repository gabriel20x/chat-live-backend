import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './users.entity';
import RegisterDto from './dto/singIn.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  // CRUD para usuarios

  // Create

  async registerUser(userData: RegisterDto) {
    try {
      const newUser = this.usersRepository.create(userData);
      await this.usersRepository.save(newUser);
      return HttpStatus.CREATED;
    } catch (error) {
      console.log(error);
    }
  }

  // Get
  async getUserByUsername(username: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where({ username })
      .addSelect('user.password')
      .getOne();
    if (user) {
      return user;
    }
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async getAllUsers() {
    const users = await this.usersRepository.find();
    if (users) {
      return users;
    }
    throw new HttpException(
      'There is not users in the database yet',
      HttpStatus.NOT_FOUND,
    );
  }

  // Read
  // Update
  updateUserById() {}
  // Delete
  deleteUserById() {}
}

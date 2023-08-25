import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import RegisterDto from './dto/singIn.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'The users has been successfully created.',
  })
  @ApiForbiddenResponse({
    description: 'The user has not created',
  })
  @ApiBody({ type: RegisterDto })
  async registerUser(@Body() registerDto: RegisterDto) {
    const statusResponse = await this.usersService.registerUser(registerDto);
    if (statusResponse === HttpStatus.CREATED) return statusResponse;
    throw new HttpException('The users was not created', HttpStatus.FORBIDDEN);
  }
}

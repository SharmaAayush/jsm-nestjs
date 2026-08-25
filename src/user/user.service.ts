import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLogger } from './user.logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: UserLogger) {}

  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];

  findAllUsers(name: string = '') {
    this.logger.log('Finding all the users');

    return this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  findById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    this.users.push({
      id: this.users[this.users.length - 1].id + 1,
      name: createUserDto.name,
      email: createUserDto.email,
    });
    return createUserDto;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findById(id);

    if (user) {
      user.name = updateUserDto.name || user.name;
      user.email = updateUserDto.email || user.email;
    }

    return user;
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(index, 1);
  }
}

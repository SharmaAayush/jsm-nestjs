import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('user')
export class UserController {
  private readonly users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Adrian' },
  ];

  constructor(private readonly userService: UserService) {}

  // GET /user
  @Get()
  getUsers(@Query('name') name?: string) {
    return this.userService.findAllUsers(name);
  }

  // GET /user/:id
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);

    return {
      data: createUserDto,
      message: 'User created successfully',
    };
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.updateUser(id, updateUserDto);

    return {
      data: { id, ...updateUserDto },
      message: 'User updted successfully',
    };
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}

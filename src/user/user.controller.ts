import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TableName } from 'src/decorators/table-name.decorator';
import { ActionType } from 'src/decorators/action-type.decorator';

@TableName('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ActionType("get")
  @Get("byQueryBuilder")
  findAll() {
    return this.userService.findAll();
  }

  @Get("byRaw")
  findByRaw(){
    return this.userService.findRaw()
  }

  @Get("byRelationMetaData")
  findByRelation(){
    return this.userService.findAllRelation();
  }

  // @SetMetadata('action',["Read","one"])
  @Get(':id')
  findOne(@Param('id') name: string) {
    return this.userService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

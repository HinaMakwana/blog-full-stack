import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuth } from './jwt-auth.guard';
import { JwtAuthGuard } from 'src/admin/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(
    @Body() data : { email :string, password: string},
    ) {
    const token = await this.userService.login(data.email,data.password)
    return {token : token}
  }

  @UseGuards(JwtAuth)
  @Post('logout')
  async logout(@Request() req) {
    const userId = req.user.id
    return this.userService.logout(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const adminId = req.user.id
    return this.userService.findAll(adminId);
  }

  @UseGuards(JwtAuth,JwtAuthGuard)
  @Patch()
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req
    ) {
      const id = req.user.id
    return this.userService.update(id,updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('status')
  changeStatus(
    @Request() req,
    @Body() data:{email : string,status:string}
  ) {
    const adminId = req.user.id
    return this.userService.changeStatus(adminId,data.email,data.status)
  }
  @UseGuards(JwtAuth,JwtAuthGuard)
  @Delete()
  remove(
    @Body() data : {email : string},
    @Request() req
    ) {
      const id = req.user.id
    return this.userService.remove(id,data.email);
  }
  @Post('search')
  searchBlog(
    @Body() data : { title : string}
  ) {
    return this.userService.searchUser(data.title)
  }
  @Get('count')
  coundData() {
    return this.userService.countUser()
  }
  @UseGuards(JwtAuthGuard)
  @Get('active')
  findActiveUser(@Request() req) {
    const adminId = req.user.id
    return this.userService.ActiveUser(adminId);
  }
}

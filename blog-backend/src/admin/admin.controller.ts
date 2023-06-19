import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(
    @Body() createAdminDto : CreateAdminDto
  ) {
    return this.adminService.create(createAdminDto)
  }

  @Post('login')
  login(
    @Body() data : { email: string,password : string}
  ) {
    return this.adminService.login(data.email,data.password)
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(
    @Request() req
  ) {
    const adminId = req.user.id
    return this.adminService.logout(adminId)
  }

}

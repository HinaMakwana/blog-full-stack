import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, InternalServerErrorException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/admin/jwt-auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createCategoryDto : CreateCategoryDto,
    @Request() req
  ) {
    const adminId = req.user.id
    if(createCategoryDto.categoryName === ''){
      throw new InternalServerErrorException()
    }

    return this.categoryService.create(adminId,createCategoryDto)
  }

  @Get()
  async getAll(
    @Request() req
  ) {
    return this.categoryService.getAll()
  }
  @UseGuards(JwtAuthGuard)
  @Patch('edit')
  update(
    @Request() req,
    @Body() data : { oldName : string, newName : string}
  ) {
    const adminId = req.user.id
    return this.categoryService.update(adminId,data.oldName,data.newName)
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  changeStatus(
    @Request() req,
    @Body() data:{name : string,status:string}
  ) {
    const adminId = req.user.id
    return this.categoryService.changeStatus(adminId,data.name,data.status)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteCategory(
    @Request() req,
    @Body() data: {name: string}
  ) {
    const adminId = req.user.id
    return this.categoryService.deleteCategory(adminId,data.name)
  }

  @Post('findOne')
  findOne(
    @Body() data : { name : string}
  ) {
    return this.categoryService.findOne(data.name)
  }
  @Post('search')
  searchBlog(
    @Body() data : { title : string}
  ) {
    return this.categoryService.searchCategory(data.title)
  }
  @Get('count')
  countData() {
    return this.categoryService.countCategory()
  }
}

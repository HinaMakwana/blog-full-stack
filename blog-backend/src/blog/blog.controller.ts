import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Request } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import slugify from 'slugify';
import { JwtAuth } from 'src/user/jwt-auth.guard';
import { log } from 'console';
import { JwtAuthGuard } from 'src/admin/jwt-auth.guard';


@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuth)
  @Post()
  create(
    @Body() createBlogDto: CreateBlogDto,
    @Request() req
    ) {
      const userId = req.user.id
      createBlogDto.uploadedDate = new Date()
      createBlogDto.slug = slugify(createBlogDto.title)
      createBlogDto.author = userId
      return this.blogService.create(createBlogDto,userId);
  }

  @Post('limit')
  findAll(
    @Request() req,
    @Body() data: { limit: number}
  ) {
    return this.blogService.findAll(data.limit);
  }

  @UseGuards(JwtAuth)
  @Get('find')
  findOne(
    @Request() req,
  ) {
    const userId = req.user.id
    return this.blogService.findOne(userId)
  }

  @UseGuards(JwtAuth)
  @Patch()
  update(
    @Body() updateBlogDto: UpdateBlogDto,
    @Request() req
    ) {
      const userId = req.user.id
    return this.blogService.update(userId, updateBlogDto);
  }

  @UseGuards(JwtAuth,JwtAuthGuard)
  @Delete()
  remove(
    @Body() data : { id : string },
    @Request() req
  ) {
    const userId = req.user.id
    return this.blogService.remove(userId,data.id);
  }

  @Post('search')
  searchBlog(
    @Body() data : { title : string}
  ) {
    return this.blogService.searchBlog(data.title)
  }
  @Get('count')
  countData() {
    return this.blogService.countBlog()
  }
}

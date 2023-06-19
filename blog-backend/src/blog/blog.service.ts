import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { DataSource, Like, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepo: Repository<Blog>,
    @InjectRepository(User) private userRepo : Repository<User>,
    @InjectRepository(Admin) private adminRepo : Repository<Admin>
  ) {}
  async create(createBlogDto: CreateBlogDto,id: string) {
    const findUser = await this.userRepo.findOneBy({id: id})
    if(!findUser){
      throw new UnauthorizedException({
        message : 'User is unAuthenticated'
      })
    }

    const createBlog = await this.blogRepo.create({
      ...createBlogDto,
      category: createBlogDto.category as Category,
      author: createBlogDto.author as User
    })
    await this.blogRepo.save(createBlog)
    return createBlog;
  }

  async findAll(limit: number) {
    const data = (await this.blogRepo.find({relations:['category','author'],take:limit }))
    return data;
  }

  async update(id: any, updateBlogDto: UpdateBlogDto) {
    const findUser = await this.userRepo.findOneBy({id: id})
    if(!findUser){
      throw new UnauthorizedException({
        message : 'User is unAuthenticated'
      })
    }
    const updateBlog = await this.blogRepo.update({author: id,id: updateBlogDto.id},{...updateBlogDto})
    if(updateBlog.affected == 0) {
      throw new NotAcceptableException({
        message : 'User is not edit this blog'
      })
    }
    return {
      message : 'blog updated',
      title : updateBlogDto.title,
      description : updateBlogDto.description
    }
  }

  async remove(userId: any,id:string) {
    const findUser = await this.userRepo.findOneBy({id: userId})
    if(!findUser){
      const findAdmin = await this.adminRepo.findOneBy({id: userId})
      if(findAdmin) {
        const deleteData = await this.blogRepo.delete({id:id})
        return deleteData
      }
      if(!findAdmin){
        throw new UnauthorizedException({
          message : 'User unauthorized'
        })
      }
    }
    const deleteBlog = await this.blogRepo.delete({author: userId, id:id})
    if(deleteBlog.affected == 0){
      throw new NotAcceptableException({
        message : 'User is not edit this blog'
      })
    }
    return {
      message : 'blog deleted'
    };
  }

  async findOne(userId:any) {
    const findUser = await this.userRepo.findOneBy({id: userId})
    if(!findUser){
      throw new UnauthorizedException({
        message : 'User is unAuthenticated'
      })
    }
    const data = await this.blogRepo.createQueryBuilder('blog')
    .leftJoinAndSelect('blog.author','user')
    .leftJoinAndSelect('blog.category','category')
    .where(`user.id = '${userId}'`,{id:userId})
    .getMany()
    if(!data) {
      throw new NotFoundException({
        message : 'not found'
      })
    }
    return data
  }

  async searchBlog(slug: string) {
    try {
      const data = await this.blogRepo.find({where : {
        title : Like(`${slug}%`)
      },relations: ['author','category']})
      return data
    } catch (error) {
      console.log(error)
      return error
    }

  }
  async countBlog() {
    const countData = await this.blogRepo.findAndCount()
    return countData[1]
  }
}

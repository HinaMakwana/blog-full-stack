import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Like, Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo : Repository<Category>,
    @InjectRepository(Admin) private adminRepo : Repository<Admin>
  ) {}

  async create(id:string,createCategoryDto : CreateCategoryDto){
    try {
      const findAdmin = await this.adminRepo.findOneBy({id: id})
      if(!findAdmin) {
        throw new NotFoundException({
          message : 'not found'
        })
      }
      const findCategory = await this.categoryRepo.findOneBy({categoryName: createCategoryDto.categoryName})
      if(findCategory){
        throw new ConflictException({
          message : 'category name exists'
        })
      }
      const data = await this.categoryRepo.create(createCategoryDto)
      await this.categoryRepo.save(data)
      return data
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException({
        message : 'something went wrong'
      })
    }
  }
  async getAll() {
    try {

      const data = await this.categoryRepo.find()
      return data
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException({
        message : 'something went wrong'
      })
    }
  }
  async update(id: string, oldName: string, newName: string) {
    try {
      const findAdmin = await this.adminRepo.findOneBy({id: id})
      if(!findAdmin) {
        throw new NotFoundException({
          message : 'not found'
        })
      }
      const findCategory = await this.categoryRepo.findOneBy({categoryName: oldName})
      if(!findCategory){
        throw new NotFoundException({
          message : 'category not exists'
        })
      }
      const updateData = await this.categoryRepo.update({categoryName:oldName},{categoryName:newName})
      if(updateData){
        return {
          categoryName : newName,
          id: findCategory.id
        }
      }

    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException({
        message : 'something went wrong'
      })
    }
  }
  async changeStatus(id: string, name: string,status: string) {
    try {
      const findAdmin = await this.adminRepo.findOneBy({id: id})
      if(!findAdmin) {
        throw new NotFoundException({
          message : 'not found'
        })
      }
      const findCategory = await this.categoryRepo.findOneBy({categoryName: name})
      if(!findCategory){
        throw new NotFoundException({
          message : 'category not exists'
        })
      }
      let updateData,categoryStatus
      if(status == 'A') {
        categoryStatus = 'Active'
        updateData = await this.categoryRepo.update({categoryName:name},{status: 'A'})
      } else {
        categoryStatus = 'Inactive'
        updateData = await this.categoryRepo.update({categoryName:name},{status: 'I'})
      }
      if(updateData){
        return {
          status : categoryStatus
        }
      }

    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException({
        message : 'something went wrong'
      })
    }
  }
  async deleteCategory(id: string, name:string) {
    try {
      const findAdmin = await this.adminRepo.findOneBy({id: id})
      if(!findAdmin) {
        throw new NotFoundException({
          message : 'not found'
        })
      }
      const findCategory = await this.categoryRepo.findOneBy({categoryName: name})
      if(!findCategory){
        throw new NotFoundException({
          message : 'category not exists'
        })
      }
      await this.categoryRepo.delete({categoryName:name})
      return {
        message : 'category deleted'
      }
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException({
        message : 'something went wrong'
      })
    }
  }
  async findOne(name: string){
    const data = await this.categoryRepo.findOneBy({categoryName: name})
    if(!data) {
      throw new NotFoundException({
        message : 'Not found'
      })
    }
    return data
  }
  async searchCategory(slug: string) {
    try {
      const data = await this.categoryRepo.find({where : {
        categoryName : Like(`${slug}%`)
      }})
      return data
    } catch (error) {
      console.log(error)
      return error
    }

  }
  async countCategory() {
    const countData = await this.categoryRepo.findAndCount()
    return countData[1]
  }
}

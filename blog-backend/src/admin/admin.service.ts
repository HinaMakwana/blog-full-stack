import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    private readonly jwtService : JwtService
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const findEmail = await this.adminRepo.findOneBy({email: createAdminDto.email})
      if(findEmail) {
        throw new ConflictException({
          error : 'Conflict user',
          message : 'User already exists'
        })
      }
      const pass = await hash(createAdminDto.password,10)
      const data = this.adminRepo.create({...createAdminDto,password:pass})
      await this.adminRepo.save(data)
      console.log(data);

      return data;
    } catch (error) {
      throw new InternalServerErrorException({
        message : 'fill all field',
        error : 'all field are required'
      })
    }
  }

  async login(email: string,password: string) {
    const findUser = await this.adminRepo.findOneBy({ email: email })
    console.log('user',findUser);

    if(!findUser){
      throw new NotFoundException({
        error : 'Not found',
        message : 'email or password invalid'
      })
    }
    const isMatch = await compare(password,findUser.password)
    if(!isMatch) {
      throw new ForbiddenException({
        message : 'password invalid'
      })
    }
    const payload = { email : findUser.email, id : findUser.id}
    const token = await this.jwtService.sign(payload,{ secret: process.env.JWT_SECRET})
    await this.adminRepo.update({id : findUser.id},{token : token})
    return {token : token}
  }

  async logout(id: string) {
    try {
      const findAdmin = await this.adminRepo.findOneBy({id: id})
      if(!findAdmin) {
        throw new NotFoundException({
          message : 'invalid token'
        })
      }
      await this.adminRepo.update({ id: id},{token : null})
    } catch (error) {
      throw new InternalServerErrorException({
        message : 'something went wrong'
      })
    }
  }

  
}

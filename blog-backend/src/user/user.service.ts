import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo : Repository<User>,
    private readonly jwtService : JwtService,
    @InjectRepository(Admin) private adminRepo : Repository<Admin>
  ){}
  async create(createUserDto: CreateUserDto) {
    try {
      const findEmail = await this.userRepo.findOneBy({email: createUserDto.email})
      if(findEmail) {
        throw new ConflictException({
          error : 'Conflict user',
          message : 'User already exists'
        })
      }
      const pass = await hash(createUserDto.password,10)
      const data = this.userRepo.create({...createUserDto,password:pass})
      await this.userRepo.save(data)
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
    const findUser = await this.userRepo.findOneBy({ email: email })
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
    await this.userRepo.update({id : findUser.id},{token : token})
    return token
  }
  async logout(id:string) {
    const findUser = await this.userRepo.findOneBy({id:id})
    if(!findUser) {
      throw new UnauthorizedException({
        message : 'user not authorized'
      })
    }
    const updateData = await this.userRepo.update({id: id},{token : null})
    if(updateData.affected == 0){
      throw new NotAcceptableException({
        message :'user is not logout successfully'
      })
    }
    return {
      message : 'Logout successfully'
    }
  }
  async findAll(id: string) {
    const findAdmin = await this.adminRepo.findOneBy({id: id})
    console.log('findAdmin',findAdmin);

    if(!findAdmin){
      throw new UnauthorizedException({
        message : 'user not authorized'
      })
    }
    const data = this.userRepo.find()
    return data;
  }
   async update(id: string, updateUserDto: UpdateUserDto) {

    const findAdmin = await this.adminRepo.findOneBy({id: id})
    if(!findAdmin) {
      const findUser = await this.userRepo.findOneBy({id: id})
      if(!findUser) {
        throw new NotFoundException({
          message : 'Not found'
        })
      }
    }
    const findUserByEmail = await this.userRepo.findOneBy({email: updateUserDto.oldEmail})
    if(!findUserByEmail){
      throw new NotFoundException({
        message: 'Not found email'
      })
    }
    const data = {
      firstName : updateUserDto.firstName,
      lastName : updateUserDto.lastName,
      email : updateUserDto.email
    }

    const data1 = await this.userRepo.update({email: findUserByEmail.email},{...data})
    if(data1){

      return {
        updateUserDto
      }
    }
  }
  async remove(id: string,email: string) {
    const findAdmin = await this.adminRepo.findOneBy({id: id})
    if(!findAdmin) {
      const findUser = await this.userRepo.findOneBy({id: id})
      if(!findUser) {
        throw new NotFoundException({
          message : 'Not found'
        })
      }
    }
    const findUserByEmail = await this.userRepo.findOneBy({email: email})
    if(!findUserByEmail){
      throw new NotFoundException({
        message: 'Not found email'
      })
    }
    await this.userRepo.delete({email: email})
    return {
      message : 'user deleted'
    };
  }
  async changeStatus(id: string, email: string,status: string) {
    try {
      const findAdmin = await this.adminRepo.findOneBy({id: id})
      if(!findAdmin) {
        throw new NotFoundException({
          message : 'not found'
        })
      }
      const findCategory = await this.userRepo.findOneBy({email: email})
      if(!findCategory){
        throw new NotFoundException({
          message : 'email not exists'
        })
      }
      let updateData,userStatus
      if(status == 'A') {
        userStatus = 'Active'
        updateData = await this.userRepo.update({email: email},{status: 'A'})
      } else {
        userStatus = 'Inactive'
        updateData = await this.userRepo.update({email : email},{status: 'I'})
      }

      if(updateData.affected == 0){
        throw new NotImplementedException({
          message : 'not updated'
        })
      }
      return {
        status : userStatus
      }

    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException({
        message : 'something went wrong'
      })
    }
  }
  async searchUser(slug: string) {
    try {
      const data = await this.userRepo.find({where : {
        firstName : Like(`${slug}%`)
      }})
      return data
    } catch (error) {
      console.log(error)
      return error
    }

  }
  async countUser() {
    const countData = await this.userRepo.findAndCount()
    return countData[1]
  }
  async ActiveUser(id:string) {
    const findAdmin = await this.adminRepo.findOneBy({id: id})
    console.log('findAdmin',findAdmin);

    if(!findAdmin){
      throw new UnauthorizedException({
        message : 'user not authorized'
      })
    }
    const data = this.userRepo.find({where : {status: 'A'}})
    return data;
  }
}

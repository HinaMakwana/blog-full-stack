import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	firstName : string
	@IsOptional()
	lastName : string
	@IsOptional()
	email : string
	@IsNotEmpty()
	oldEmail : string
}

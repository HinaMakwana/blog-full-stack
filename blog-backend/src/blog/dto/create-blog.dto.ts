import { IsNotEmpty, IsOptional } from "class-validator"
import { Category } from "src/category/entities/category.entity"
import { User } from "src/user/entities/user.entity"

export class CreateBlogDto {
	@IsNotEmpty()
	title : string
	@IsNotEmpty()
	description : string
	@IsNotEmpty()
	category : Category
	@IsOptional()
	slug: string
	@IsOptional()
	uploadedDate : Date
	@IsOptional()
	author: User
}

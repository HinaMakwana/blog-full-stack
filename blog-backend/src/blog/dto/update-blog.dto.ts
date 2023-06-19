import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBlogDto {
	@IsOptional()
	title : string
	@IsOptional()
	description : string
	@IsNotEmpty()
	id: string
}

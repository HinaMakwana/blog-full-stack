import { Blog } from "src/blog/entities/blog.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'blogCategory'})
export class Category {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	categoryName: string

	@Column({
		enum: ['A','I'],
		default: 'A'
	})
	status : string

	@OneToMany(()=> Blog, (blog : Blog) => blog.category)
	blogs: Blog[]
}

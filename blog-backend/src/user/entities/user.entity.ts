import { Blog } from "src/blog/entities/blog.entity";
import { Collection, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
	name: 'user'
})
export class User {
	@PrimaryGeneratedColumn('uuid')
	id : string

	@Column()
	firstName : string

	@Column()
	lastName : string

	@Column()
	email : string

	@Column()
	password : string

	@Column({ nullable: true , select: false})
	token : string

	@Column({
		enum: ['A','I'],
		default: 'A'
	})
	status : string

	@OneToMany(()=> Blog, (blog : Blog) => blog.author)
	blogs: Blog[]
}

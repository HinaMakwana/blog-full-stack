import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'blog'})
export class Blog {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	title: string

	@Column()
	description: string

	@Column()
	uploadedDate : Date

	@Column({
        nullable : true
    })
    slug : string

	@ManyToOne(() => Category,(category: Category) => category.blogs)
	@JoinColumn()
	category : Category

	@ManyToOne(() => User, (author: User) => author.blogs)
	author : User

}

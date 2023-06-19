import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'admin'})
export class Admin {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	email : string

	@Column()
	password : string

	@Column({ nullable : true })
	token : string
}

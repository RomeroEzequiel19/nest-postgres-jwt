import { Breed } from "../../breed/entities/breed.entity"
import { User } from "../../users/entities/user.entity"
import {Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne} from "typeorm"

@Entity()
export class Cat {

    // @PrimaryGeneratedColumn()
    // @Column()
    @Column({primary: true, generated: true})
    id: number

    @Column()
    name: string

    @Column()
    age: number

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => Breed, (breed) => breed.id, {
        eager: true, // para que traiga las razas al hacer un findOne
    })
    breed: Breed

    @ManyToOne(() => User)
    @JoinColumn({name: "userEmail", referencedColumnName: "email"})
    user:User

    @Column()
    userEmail: string
    
}

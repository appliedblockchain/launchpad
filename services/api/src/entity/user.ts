import { IsEmail, Length } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 80,
  })
  @Length(10, 80)
  name: string

  @Column({
    length: 100,
  })
  @Length(10, 100)
  @IsEmail()
  email: string
}

export const userSchema = {
  id: { type: 'number', required: true, example: 1 },
  name: { type: 'string', required: true, example: 'Javier' },
  email: {
    type: 'string',
    required: true,
    example: 'avileslopez.javier@gmail.com',
  },
}

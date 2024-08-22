import { Board } from 'src/boards/entities/board.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })  // 리프레쉬 토큰 저장하는 컬럼
  refreshToken: string;        // 리프레쉬 토큰은 삭제되는 경우가 있기 때문에 nullable: true

  @Column({ unique: true })   // 중복회원가입이 안되도록 unique 옵션 추가
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Board, board => board.author)
  boards: Board[];

  @OneToMany(() => Comment, comment => comment.author)
comments: Comment[];
}

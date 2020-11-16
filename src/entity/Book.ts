import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * Bookクラス
 * @description 本のエンティティ
 * @export
 * @class Book
 */
@Entity({ name: "books" })
export class Book {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id?: number;

  @Column({ name: "title" })
  title: string;

  @Column({ name: "auther" })
  auther: string;

  @Column({ name: "isPublished" })
  isPublished: boolean = false;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  constructor(title: string, auther: string) {
    this.title = title;
    this.auther = auther;
  }
}

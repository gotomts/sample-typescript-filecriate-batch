import { Book } from "../entity/book";

/**
 * IBookRepositoryインターフェース
 */
export interface IBookRepository {
  /**
   * findAllメソッド
   */
  findAll(): Promise<Book[]>;

  /**
   * findBookByIdメソッド
   */
  findBookById(id: number): Promise<Book>;
}

import { Book } from "../entity/books";

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

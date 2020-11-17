import { IBookRepository } from "../repository/iBookRepository";
import { Book } from "../entity/books";

/**
 * BookApplicationService クラス
 */
export class BookApplicationService {
  private readonly repository: IBookRepository;

  constructor(repository: IBookRepository) {
    this.repository = repository;
  }

  /**
   * findAllメソッド
   */
  async findAll(): Promise<Book[]> {
    try {
      const books = await this.repository.findAll();
      return books;
    } catch (err) {
      throw err;
    }
  }

  /**
   * findBookByIdメソッド
   */
  async findBookById(id: number): Promise<Book> {
    try {
      const book = await this.repository.findBookById(id);
      return book;
    } catch (err) {
      throw err;
    }
  }
}

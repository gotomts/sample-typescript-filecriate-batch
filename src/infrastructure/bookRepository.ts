import { getRepository, Repository } from "typeorm";
import { Book } from "../entity/book";
import { IBookRepository } from "../repository/iBookRepository";

/**
 * BookRepository クラス
 */
export class BookRepository implements IBookRepository {
  private readonly repository: Repository<Book>;

  constructor() {
    this.repository = getRepository<Book>("Book");
  }

  /**
   * IBookRepositoryインターフェース
   */
  async findAll(): Promise<Book[]> {
    const response = await this.repository.find().catch((err) => {
      console.log(err);
      throw new Error("find error");
    });
    return response;
  }

  /**
   * findBookByIdメソッド
   */
  async findBookById(id: number): Promise<Book> {
    const response = await this.repository.findOneOrFail(id).catch((err) => {
      console.log(err);
      throw new Error("find error");
    });
    return response;
  }
}

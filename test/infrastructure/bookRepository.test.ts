import { BookRepository } from "../../src/infrastructure/bookRepository";
import { Book } from "../../src/entity/book";
import * as typeorm from "typeorm";

describe("BookRepository テスト", () => {
  test("test", async () => {
    // テストデータ
    const bookList: Book[] = [
      {
        isPublished: false,
        title: "title1",
        auther: "auther1",
      },
      {
        isPublished: false,
        title: "title2",
        auther: "auther2",
      },
    ];
    // Mock化
    (typeorm as any).getRepository = jest.fn(() => ({
      find: () => Promise.resolve(bookList),
    }));
    // 対象コード実行
    const bookRepository = new BookRepository();
    const res = await bookRepository.findAll();
    console.log(res);
  });
});

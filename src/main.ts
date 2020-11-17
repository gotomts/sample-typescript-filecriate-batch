import { createConnection } from "typeorm";

import { BookApplicationService } from "./application/bookApplicationService";
import { BookRepository } from "./infrastructure/bookRepository";

/**
 * メイン処理
 */
const main = async () => {
  try {
    const connection = await createConnection();
    const applicationService = new BookApplicationService(new BookRepository());
    const books = await applicationService.findAll();
    console.log(books);
    connection.close();
  } catch (err) {
    console.log(err);
  }
};

main();

import { Seeder, Factory } from "typeorm-seeding";
import { Book } from "../entity/Book";

/**
 * CreateBooksクラス
 */
export default class CreateBooks implements Seeder {
  run = async (factory: Factory): Promise<void> => {
    // tslint:disable-next-line: no-magic-numbers
    await factory(Book)().createMany(10);
  };
}

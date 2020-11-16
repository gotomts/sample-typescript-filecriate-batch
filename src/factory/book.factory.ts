import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { Book } from "../entity/Book";

define(Book, (faker: typeof Faker) => {
  const title = faker.name.title();
  const auther = `${faker.name.firstName()} ${faker.name.lastName()}`;

  const book = new Book(title, auther);
  return book;
});

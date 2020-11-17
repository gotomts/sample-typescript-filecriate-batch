import { MigrationInterface, QueryRunner } from "typeorm";

// tslint:disable-next-line: completed-docs
export class Book1605486079009 implements MigrationInterface {
  name = "Book1605486079009";

  // tslint:disable-next-line: completed-docs
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `books` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `auther` varchar(255) NOT NULL, `isPublished` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  // tslint:disable-next-line: completed-docs
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE `books`");
  }
}

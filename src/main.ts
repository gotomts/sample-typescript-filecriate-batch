import { createConnection } from "typeorm";

/**
 * メイン処理
 */
const main = () => {
  createConnection()
    .then((connection) => {
      console.log("Hello TypeScript!!");
      connection.close();
    })
    .catch((error) => {
      console.log(error);
    });
};

main();

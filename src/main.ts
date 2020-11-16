import { createConnection } from "typeorm";
const ormconfig = require("../ormconfig");
/**
 * メイン処理
 */
const main = () => {
  createConnection(ormconfig)
    .then((connection) => {
      console.log("Hello TypeScript!!");
      connection.close();
    })
    .catch((error) => {
      console.log(error);
    });
};

main();

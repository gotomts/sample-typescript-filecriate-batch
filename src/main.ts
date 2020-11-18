import { createConnection } from "typeorm";
import fs from "fs";
import * as AWS from "aws-sdk";

import { BookApplicationService } from "./application/bookApplicationService";
import { BookRepository } from "./infrastructure/bookRepository";
import { Book } from "./entity/book";

const fileName = "output.txt";
const filePath = `./files/${fileName}`;

const env = process.env;

/**
 * ファイル存在チェック
 * @param filePath
 */
const checkFile = (filePath: string): boolean => {
  if (fs.existsSync(filePath)) {
    return true;
  }
  return false;
};

/**
 * 書籍情報取得
 */
const getBookAll = async (): Promise<Book[]> => {
  const connection = await createConnection();
  const applicationService = new BookApplicationService(new BookRepository());
  const books = await applicationService.findAll();
  connection.close();
  return books;
};

/**
 * 出力用にテキスト整形
 * @param books
 */
const formatData = (books: Book[]): string => {
  const lineText = Array();
  for (let i = 0; i < books.length; i += 1) {
    lineText.push(
      `${books[i].title},${books[i].auther},${books[i].isPublished},2000,0,0`
    );
  }
  const formatData = lineText.join("\n");
  return formatData;
};

/**
 * ファイル作成
 * @param outputText
 */
const createFile = (filePath: string, outputText: string) => {
  fs.writeFileSync(filePath, outputText);
};

/**
 * AWS S3へファイルアップロード
 */
const s3FileUpload = (
  accessKey: string,
  secretAccessKeyId: string,
  regionName: string,
  bucketName: string,
  directory: string,
  fileName: string,
  body: Buffer
) => {
  const s3: AWS.S3 = new AWS.S3({
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKeyId,
    region: regionName,
  });
  const params: AWS.S3.Types.PutObjectRequest = {
    Bucket: bucketName,
    Key: `${directory}/${fileName}`,
    Body: body,
  };
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully uploaded file.", data);
    }
  });
};

/**
 * メイン処理
 */
const main = async () => {
  try {
    // ファイル存在チェック・削除
    if (checkFile(filePath)) {
      fs.unlinkSync(filePath);
    }
    // 書籍情報一覧取得
    const books = await getBookAll();
    // ファイル出力するデータを整形
    const outputData = formatData(books);
    console.log(outputData);
    // ファイル作成
    createFile(filePath, outputData);
    const uploadData = fs.readFileSync(filePath);
    // TODO:S3アップロード
    s3FileUpload(
      String(env.AWS_S3_ACCESSKEY),
      String(env.AWS_S3_SECRETACCESSKEY),
      String(env.AWS_S3_REGION),
      String(env.AWS_S3_BUCKET_NAME),
      String(env.AWS_S3_BUCKET_DIRECTORY),
      fileName,
      uploadData
    );
  } catch (err) {
    console.log(err);
  }
};

main();

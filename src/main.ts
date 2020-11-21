import { createConnection } from "typeorm";
import fs from "fs";
import * as AWS from "aws-sdk";
import { getLogger } from "log4js";

import { BookApplicationService } from "./application/bookApplicationService";
import { BookRepository } from "./infrastructure/bookRepository";
import { Book } from "./entity/book";

const logger = getLogger();
logger.level = "info";

const fileName = "output.txt";
const fileTestName = "test.txt";

const env = process.env;

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
 * AWS S3 ファイル削除
 */
const s3FileDelete = async (
  accessKey: string,
  secretAccessKeyId: string,
  regionName: string,
  bucketName: string,
  deleteList: AWS.S3.ObjectIdentifierList
) => {
  const s3: AWS.S3 = new AWS.S3({
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKeyId,
    region: regionName,
  });
  const params: AWS.S3.Types.DeleteObjectsRequest = {
    Bucket: bucketName,
    Delete: {
      Objects: deleteList,
    },
  };
  const result = await s3.deleteObjects(params).promise();
  return result;
};

/**
 * AWS S3へファイルアップロード
 */
const s3FileUpload = async (
  accessKey: string,
  secretAccessKeyId: string,
  regionName: string,
  bucketName: string,
  directory: string,
  fileName: string,
  body: Buffer | string
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
  const result = await s3.upload(params).promise();
  return result;
};

/**
 * メイン処理
 */
const main = async () => {
  try {
    // S3ファイル削除
    const deleteList = Array();
    deleteList.push({ Key: `${env.AWS_S3_BUCKET_DIRECTORY}/${fileName}` });
    deleteList.push({ Key: `${env.AWS_S3_BUCKET_DIRECTORY}/${fileTestName}` });
    const deleteResult = await s3FileDelete(
      String(env.AWS_S3_ACCESS_KEY),
      String(env.AWS_S3_SECRETACCESS_KEY),
      String(env.AWS_S3_REGION),
      String(env.AWS_S3_BUCKET_NAME),
      deleteList
    );
    logger.info(deleteResult);
    // 書籍情報一覧取得
    const books = await getBookAll();
    // ファイル出力するデータを整形
    const outputData = formatData(books);
    logger.info(outputData);
    // ファイル作成
    fs.writeFileSync(`${fileName}`, outputData);
    const uploadData = fs.readFileSync(`${fileName}`);
    // S3アップロード
    const uploadResult1 = await s3FileUpload(
      String(env.AWS_S3_ACCESS_KEY),
      String(env.AWS_S3_SECRETACCESS_KEY),
      String(env.AWS_S3_REGION),
      String(env.AWS_S3_BUCKET_NAME),
      String(env.AWS_S3_BUCKET_DIRECTORY),
      fileName,
      uploadData
    );
    logger.info(uploadResult1);
    // S3アップロード
    const uploadResult2 = await s3FileUpload(
      String(env.AWS_S3_ACCESS_KEY),
      String(env.AWS_S3_SECRETACCESS_KEY),
      String(env.AWS_S3_REGION),
      String(env.AWS_S3_BUCKET_NAME),
      String(env.AWS_S3_BUCKET_DIRECTORY),
      fileTestName,
      String("")
    );
    logger.info(uploadResult2);
  } catch (err) {
    logger.error(err);
  }
};

main();

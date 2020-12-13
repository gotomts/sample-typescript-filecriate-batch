import fs from "fs";
import * as AWS from "aws-sdk";
import { getLogger } from "log4js";
import { execSync } from "child_process";

const logger = getLogger();
logger.level = "info";

const env = process.env;

const fileName = "output.txt.gpg";
const downloadFile = "download.txt";
const directory = String(env.AWS_S3_BUCKET_DIRECTORY);

/**
 * ダウンロード
 */
const download = async () => {
  const s3: AWS.S3 = new AWS.S3({
    accessKeyId: String(env.AWS_S3_ACCESS_KEY),
    secretAccessKey: String(env.AWS_S3_SECRETACCESS_KEY),
    region: String(env.AWS_S3_REGION),
  });
  try {
    // download
    execSync(
      `aws s3 cp s3://${env.AWS_S3_BUCKET_NAME}/${env.AWS_S3_BUCKET_DIRECTORY}/${fileName} ./${downloadFile}.gpg`
    );
    // decrypt
    execSync(
      `echo ${env.GPG_KEY_PASSPHRASE} | gpg --batch --no-tty --passphrase-fd 0 --output ${downloadFile} --decrypt ./${downloadFile}.gpg`
    );
  } catch (err) {
    logger.error(err);
  }
};

download();

# typescript-s3-fileupload

TypeScript で AWS S3 へファイルをアップロードします。

## docker によるビルド・実行

### docker compose による DB 準備

```
docker-compose up -d
```

### ビルド

```
docker build -t typescript-s3-fileupload:latest .
```

## 実行

```
docker run --network="typescript-s3-fileupload_default" typescript-s3-fileupload
```

## npm script

| npm スクリプト           | 用途                            |
| ------------------------ | ------------------------------- |
| npm run build            | トランスパイル                  |
| npm run exec             | 実行                            |
| npm run dev              | ts-node 実行                    |
| npm run migration:run    | マイグレーション実行            |
| npm run migration:revert | マイグレーションを 1 つ前に戻す |
| npm run seed:run         | シーディング実行                |
| npm run schema:drop      | マイグレーションリセット        |

## 環境変数

| 環境変数名              | 用途                              |
| ----------------------- | --------------------------------- |
| TYPEORM_CONNECTION      | DB の種類                         |
| TYPEORM_HOST            | 接続先ホスト                      |
| TYPEORM_PORT            | 接続先ポート                      |
| TYPEORM_USERNAME        | 接続先ユーザー名                  |
| TYPEORM_PASSWORD        | 接続先パスワード                  |
| TYPEORM_DATABASE        | 接続先 DB 名                      |
| AWS_S3_ACCESS_KEY       | AWS のアクセスキー                |
| AWS_S3_SECRETACCESS_KEY | AWS のシークレットアクセスキー    |
| AWS_S3_REGION           | AWS S3 バケットのリージョン       |
| AWS_S3_BUCKET_NAME      | AWS S3 バケット名                 |
| AWS_S3_BUCKET_DIRECTORY | AWS S3 ファイル配置先ディレクトリ |

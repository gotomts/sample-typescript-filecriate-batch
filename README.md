# typescript-s3-fileupload

TypeScript で AWS S3 へファイルをアップロードします。

## TypeScript トランスパイル

```
npm run build
```

## 実行

```
npm run exec
```

## 開発時 ts-node 実行

```
npm run dev
```

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

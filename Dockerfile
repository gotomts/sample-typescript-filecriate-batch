FROM node:14.11.0

WORKDIR /usr/src/app

# パッケージインストール
COPY package*.json ./
RUN npm ci

# ソースコピー
COPY tsconfig*.json ./
COPY ./src ./src
COPY .env .

# トランスパイル
RUN npm run build

# 実行
CMD npm run exec

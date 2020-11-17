FROM node:14.11.0

WORKDIR /usr/src/app

# パッケージインストール
COPY package*.json ./
RUN npm ci

# トランスパイル
COPY tsconfig*.json ./
COPY . .
RUN npm run build

CMD [ "node", "./dist/main.js" ]

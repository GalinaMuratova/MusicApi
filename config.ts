import path from 'path';

const rootPath = __dirname;

const config = {
    rootPath,//'home/user/project/shop-api'
    publicPath: path.join(rootPath, 'public')
    //указываем в какую папку сохраняем наши картинки
};

export  default config;
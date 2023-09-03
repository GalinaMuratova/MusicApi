import multer from 'multer';
import {promises as fs} from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import config from './config';

//                                               дисковое хранилище
const imageStorage = multer.diskStorage({
    //у него есть два ключа. первый указываем в какой папке должены сохранять картинку
    //нам нужен полседний принимаемы аргумент сиди
    destination: async (_req, _file, cb) => {
        //путь
        const destDir = path.join(config.publicPath, 'images');
        //создание директории, если будет такая папка он больше создавать не будет
        await fs.mkdir(destDir, {recursive: true});
        cb(null, destDir);
        //что бы правильно работать тут передается коллбэк
    },
    //название картинки
    filename: (_req, file, cb) => {
        const extension = path.extname(file.originalname);
        //достаем у файла оригинальное название и название обернули
        // в спец метод мы достаем расширение картинки
        //в конце вызываем коллбе, передаем что никакх ошибок нет
        //тут создаст нам уникальное название картинок и добавит расширение картинки(jpg)
        cb(null,  randomUUID() + extension);
    }
});
export const imagesUpload = multer({storage: imageStorage});
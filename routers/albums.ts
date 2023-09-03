import express from "express";
import mongoose from "mongoose";
import Album from "../models/Album";
import {IAlbum} from "../types";
import {imagesUpload} from "../multer";


const albumsRouter = express.Router();

albumsRouter.get('/', async(req, res) => {
    try {
        const albums = await Album.find();
        return res.send(albums);
    } catch {
        return res.sendStatus(500);
    }
});

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const albumData: IAlbum = {
            name: req.body.name,
            year: req.body.year,
            artist: req.body.artist,
            image: req.file ? req.file.filename : null
        };
        const album = new Album(albumData);
        await album.save();
        return res.send(album);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

export default albumsRouter;
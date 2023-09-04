import express from "express";
import mongoose from "mongoose";
import Album from "../models/Album";
import {IAlbum} from "../types";
import {imagesUpload} from "../multer";


const albumsRouter = express.Router();

albumsRouter.get('/', async(req, res) => {
    try {
        if (req.query.artist) {
            const albums = await Album.find({artist: req.query.artist});
            return res.send(albums);
        } else {
            const albums = await Album.find().populate('artist', 'name');
            return res.send(albums);
        }
    } catch {
        return res.sendStatus(500);
    }
});

albumsRouter.get('/:id', async(req, res) => {
   try {
       const album = await Album.findById(req.params.id).populate('artist','name');
       if (!album) {
           return res.sendStatus(404);
       }
       return res.send(album);
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
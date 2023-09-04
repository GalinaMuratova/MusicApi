import express from "express";
import Track from "../models/Track";
import {ITrack} from "../types";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
    try {
        if (req.query.album) {
            const tracks = await Track.find({album: req.query.album});
            return res.send(tracks);
        } else {
            const tracks = await Track.find().populate('album','name');
            return res.send(tracks);
        }
    } catch {
        return res.sendStatus(500);
    }
});

tracksRouter.post('/',  imagesUpload.single('image'),async (req, res, next) => {
    try {
        const trackData: ITrack = {
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration
        };

        const track = new Track(trackData);
        await track.save();
        return res.send(track);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

export default tracksRouter;
import mongoose from "mongoose";
import Album from "./Album";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
   name: {
       type: String,
       required: true
   },
    album: {
       type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Album',
        validate: {
            validator: async (value:mongoose.Types.ObjectId) => await Album.findById(value),
            message: 'There is no such album'
        }
    },
    duration: String
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;
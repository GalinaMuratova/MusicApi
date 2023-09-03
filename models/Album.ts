import mongoose from "mongoose";
import Artist from "./Artist";
import albumsRouter from "../routers/albums";

const Schema = mongoose.Schema;

const albumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type:mongoose.Types.ObjectId,
        ref:'Artist',
        required: true,
        validate: {
            validator: async (value:mongoose.Types.ObjectId) => await Artist.findById(value),
            message: 'There is no such artist'
        }
    },
    year: {
        type: String,
        required: true
    },
    image:String
});

const Album = mongoose.model('Album', albumSchema);
export default Album;


import express from 'express';
import artistsRouter from "./routers/artists";
import mongoose from "mongoose";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistsRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/music');
    app.listen(port, ()=> {
        console.log(`Server started on ${port} port`);
    });
};

run().catch(e => console.error(e));

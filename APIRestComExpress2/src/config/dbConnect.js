import mongoose from "mongoose"

mongoose.connect('mongodb+srv://juliaaluna2:123@alura.myo7o6x.mongodb.net/alura-node');
let db = mongoose.connection;

export default db;

import mongoose from "mongoose";

mongoose.connect("mongodb+srv://juliaaluna2:123@alura.gcdftk7.mongodb.net/alura-node");
const db = mongoose.connection;
export default db;

import mongoose from "mongoose";

mongoose.connect("mongodb+srv://juliaaluna2:123@alura.gcdftk7.mongodb.net/");
let db = mongoose.connection;
export default db
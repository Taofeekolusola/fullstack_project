const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect("mongodb://root:mongo@localhost:27019/blogpost?authSource=admin");
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
};

module.exports = connectDb;
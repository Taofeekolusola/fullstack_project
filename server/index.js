const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./db');
const postsRoutes = require('./routes/postsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');


// Connect to MongoDB
connectDb();

app.use(cors())
app.use(express.json());
app.use('/posts', postsRoutes);
app.use('/comments', commentRoutes);
app.use('/users', userRoutes);


app.listen(3001, () => {
    console.log('Server is running on port 3001');
})
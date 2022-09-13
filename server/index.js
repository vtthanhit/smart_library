require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser') 
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const bookRouter = require('./routes/book');
const requestRouter = require('./routes/request');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);

    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/book', bookRouter);
app.use('/api/request', requestRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
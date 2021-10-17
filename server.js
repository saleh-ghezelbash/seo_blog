const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();


const authRoutes = require('./routes/authRoute')
const userRoutes = require('./routes/userRoute')
const categoryRoute = require('./routes/categoryRoute')
const tagRoute = require('./routes/tagRoute')
const blogRoute = require('./routes/blogRoute')
// const orderRoute = require('./routes/orderRoute')


const app = express();
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true})
.then(() => console.log('Connected to database'))
.catch(err => console.log('Something went wrong with connecting to database!!!',err))

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/tag',tagRoute);
app.use('/api/v1/blog',blogRoute);
// app.use('/api',orderRoute);

const port = process.env.PORT || 8000;
app.listen(port,console.log(`Server is running on port ${port}`))
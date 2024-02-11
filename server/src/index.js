require('dotenv').config();
const cors = require('cors');
const express=require('express')
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter');
const bookRoutes = require('./routes/bookRouter');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connection');

const app=express()

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:5173' }));

connectDB();








const PORT = process.env.PORT || 3000; 


app.use(express.json());
app.use(cookieParser());




app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

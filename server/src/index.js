require('dotenv').config();
const cors = require('cors');
const express = require('express')
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connection');


const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter');
const bookRoutes = require('./routes/bookRouter');
const globalErrorHandler = require('./middleware/globalErrorHandler');

const app = express()

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({urlencoded : true, }));
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/book', bookRoutes);


// global error handler middleware
app.use(globalErrorHandler)

connectDB();


 



app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

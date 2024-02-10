const express=require('express')
const cors = require('cors');
const app=express()
require('dotenv').config();


app.use(cors({ origin: 'http://localhost:5173' }));



const PORT = process.env.PORT || 3000; 


app.get('/api',(req,res)=>{

  res.json({data:"hello world"})
})





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

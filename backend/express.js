const express = require('express')
const app = express()
const port = 5001
const mongoDB = require("./database")
mongoDB()
app.get('/', (req, res) => {
  res.send('Hello hiiii World!')
})
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(express.json())
app.use('/api', require("./Routes/CreatUser"));
app.use('/api', require("./Routes/Displaydata"));
app.use('/api', require("./Routes/OrderData"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
 

})
 app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

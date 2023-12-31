const connectToMongo=require('./db');
var cors=require('cors')
connectToMongo();
const express = require('express')
const app = express()
const port = 5000
app.use(express.json());
app.use(cors())

app.use('/api/auth',require('./routes/auth'));
app.use('/api/UNotes',require('./routes/UNotes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
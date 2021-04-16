
import express from "express"
import fs from "fs"
const app = express();

app.use(express.static('dist'))

const templace = fs.readFileSync('./src/index.html');

app.get('*', (req, res) => {
  res.end(templace)
})

app.listen(3001, () => {
  console.log('localhost:3001')
})

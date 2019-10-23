const express =require('express');
const app = express();
app.use(express.static('dist'))
app.get('/', function (req, res) {
  res.send(('hello world'))
  console.log('server get')
});
app.put('/', function (req, res) {
  res.send(JSON.stringify('hello world'))

  console.log('server put')
});
app.post('/', function (req, res) {
  res.send(JSON.stringify('someData'))
  console.log('server post')
});
app.listen(3000, function () {
  console.log('sever list port 3000')
})


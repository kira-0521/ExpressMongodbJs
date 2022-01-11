const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/shopApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDBコネクションOK！！')
    // スキーマの定義などthenの中で書かなくても書かなくても良い仕様になっている
  })
  .catch((err) => {
    console.log('MongoDBコネクションエラー')
    console.log(err)
  })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/dogs', (req, res) => {
  res.send('wanwan')
})

app.listen(3000, () => {
  console.log('ポート3000で待ち受け中...')
})

const express = require('express')
const app = express()
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/dogs', (req, res) => {
  res.send('wanwan')
})

app.listen(3000, () => {
  console.log('ポート3000で待ち受け中...')
})

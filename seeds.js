const mongoose = require('mongoose')
const Product = require('./models/product')

mongoose
  .connect('mongodb://localhost:27017/farmStand', {
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

Product.insertMany([
  {
    name: 'ぶどう',
    price: 200,
    category: '果物',
  },
  {
    name: 'パイン',
    price: 500,
    category: '果物',
  },
  {
    name: 'なす',
    price: 300,
    category: '野菜',
  },
  {
    name: 'きゅうり',
    price: 120,
    category: '野菜',
  },
  {
    name: 'ミルク',
    price: 200,
    category: '乳製品',
  },
  {
    name: 'バター',
    price: 1200,
    category: '乳製品',
  },
])

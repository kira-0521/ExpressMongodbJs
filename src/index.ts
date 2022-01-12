import express, { Request, Response } from 'express'
const app = express()

import path from 'path'
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import { Product } from './models/product'

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

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// req.bodyをパース
app.use(express.urlencoded({ extended: true }))
// GETとPOST以外を使用
app.use(methodOverride('_method'))

app.get('/', (req: Request, res: Response) => {
  res.send('成功！')
})

// カテゴリー一覧
const categories = ['果物', '野菜', '乳製品']

// 商品一覧
app.get('/products', async (req: Request, res: Response) => {
  const products = await Product.find({})
  res.render('products/index', { products })
})

// 作成
app.get('/products/new', (req: Request, res: Response) => {
  res.render('products/new', { categories })
})
app.post('/products', async (req: Request, res: Response) => {
  const newProduct = new Product(req.body)
  await newProduct.save()
  res.redirect(`/products/${newProduct.id}`)
})

// 更新
app.get('/products/:id/edit', async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render('products/edit', { product, categories })
})
app.put('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  })
  res.redirect(`/products/${product!._id}`)
})

// 削除
app.delete('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  await Product.findByIdAndDelete(id)
  res.redirect('/products')
})

// 商品詳細
app.get('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render('products/show', { product })
})

app.listen(3000, () => {
  console.log('ポート3000で待ち受け中...')
})

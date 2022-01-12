import { Schema, model } from 'mongoose'

interface Product {
  name: string
  price: number
  category: '果物' | '野菜' | '乳製品'
}

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ['果物', '野菜', '乳製品'],
  },
})

export const Product = model<Product>('Product', productSchema)

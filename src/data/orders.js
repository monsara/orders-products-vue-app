import { products } from '@/data/products.js'

export const orders = [
  {
    id: 1,
    title: 'Order 1',
    date: '2017-06-29 12: 09: 33',
    description: '1Длинное предлинное длиннючее длиннючее название прихода',
    get products() {
      return products.filter(product => product.order === this.id)
    }
  },
  {
    id: 2,
    title: 'Order 2',
    date: '2017-06-29 12: 09: 33',
    description: '2Длинное предлинное длиннючее длиннючее название прихода',
    get products() {
      return products.filter(product => product.order === this.id)
    }
  },
  {
    id: 3,
    title: 'Order 3',
    date: '2017-06-29 12: 09: 33',
    description: '3Длинное предлинное длиннючее длиннючее название прихода',
    get products() {
      return products.filter(product => product.order === this.id)
    },
  }
]
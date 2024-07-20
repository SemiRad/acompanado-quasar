import { defineStore } from 'pinia'
import axios from 'axios'
import { type Product } from '@/types/Product'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[]
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get('https://dummyjson.com/products')
        this.products = response.data.products
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    deleteProduct(productId: number) {
      this.products = this.products.filter((product) => product.id !== productId)
    }
  }
})

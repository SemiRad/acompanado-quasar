import { defineStore } from 'pinia'
import axios from 'axios'
import type { Product } from '@/types/product'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    errorMessage: '' as string | null
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get('https://dummyjson.com/products')
        this.products = response.data.products
        this.errorMessage = null
      } catch (error) {
        this.errorMessage = 'Error fetching products'
      }
    },
    deleteProduct(productId: number) {
      this.products = this.products.filter((product) => product.id !== productId)
    }
  }
})

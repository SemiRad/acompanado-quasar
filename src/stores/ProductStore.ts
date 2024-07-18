// stores/ProductStore.ts
import { defineStore } from 'pinia'
import { type Product } from '@/types/Product'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as Product[]
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products')
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`)
        }
        const data: Product[] = await response.json()
        this.products = data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
  }
})

<template>
  <div>
    <ul v-if="!isLoading && products.length">
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - ${{ product.price }}
      </li>
    </ul>
    <div v-else-if="isLoading">Loading products...</div>
    <div v-else-if="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>
<script setup>
import { useProductStore } from '@/stores/ProductStore.ts'

const productStore = useProductStore()
const products = productStore.products
const fetchProducts = async () => {
  await productStore.fetchProducts()
}
fetchProducts()
</script>

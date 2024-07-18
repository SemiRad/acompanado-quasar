<template>
  <div class="container">
    <h1>Product List</h1>
    <table class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>SKU</th>
          <th>Title</th>
          <th>Description</th>
          <th>Category</th>
          <th>Price</th>
          <th>Total Rating</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.sku }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.category }}</td>
          <td>${{ product.price }}</td>
          <td>{{ calculateTotalRating(product.reviews) }}</td>
          <td>
            <button @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductStore } from './stores/ProductStore'
import type { Review, Product } from '@/types/Product'

const productStore = useProductStore()
const products = ref<Product[]>([])

onMounted(async () => {
  await productStore.fetchProducts()
  products.value = productStore.products
})

const deleteProduct = (productId: number) => {
  productStore.deleteProduct(productId)
  products.value = productStore.products
}

const calculateTotalRating = (reviews: Review[]) => {
  if (reviews.length === 0) return 0
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  return (totalRating / reviews.length).toFixed(2)
}
</script>

<style>
.container {
  padding: 20px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.product-table th {
  background-color: #f4f4f4;
}

button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #ff0000;
}
</style>

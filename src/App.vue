<template>
  <div class="q-pa-xl bg-dark window-height body">
    <div class="container q-pa-lg">
      <q-table
        flat
        bordered
        title="Products"
        :rows="products"
        :columns="columns"
        :loading="loading"
        row-key="id"
        dark
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props" class="text-cell">{{ props.row.id }}</q-td>
            <q-td key="sku" :props="props" class="text-cell">
              {{ props.row.sku }}
              <q-popup-edit v-model="props.row.sku" v-slot="scope">
                <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="title" :props="props" class="text-cell">
              {{ props.row.title }}
              <q-popup-edit v-model="props.row.title" v-slot="scope">
                <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="description" :props="props" class="text-cell">
              {{ props.row.description }}
              <q-popup-edit v-model="props.row.description" v-slot="scope">
                <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="category" :props="props" class="text-cell">
              {{ props.row.category }}
              <q-popup-edit v-model="props.row.category" v-slot="scope">
                <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="price" :props="props" class="text-cell">
              {{ props.row.price }}
              <q-popup-edit v-model="props.row.price" v-slot="scope">
                <q-input
                  type="number"
                  v-model="scope.value"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="rating" :props="props" class="text-cell">{{
              calculateTotalRating(props.row.reviews)
            }}</q-td>
            <q-td key="actions" :props="props" class="text-cell">
              <q-btn flat color="red" icon="delete" @click="deleteProduct(props.row.id)" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductStore } from './stores/ProductStore'
import type { Review, Product } from '@/types/Product'
import { type QTableProps } from 'quasar'

const productStore = useProductStore()
const products = ref<Product[]>([])
const loading = ref(true)

const columns: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    sortable: true,
    align: 'left',
    headerStyle: 'font-weight: bold; font-size: medium'
  },
  {
    name: 'sku',
    label: 'SKU',
    field: 'sku',
    sortable: true,
    align: 'left',
    headerStyle: 'font-weight: bold; font-size: medium'
  },
  {
    name: 'title',
    label: 'Title',
    field: 'title',
    sortable: true,
    align: 'left',
    headerStyle: 'font-weight: bold; font-size: medium'
  },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    sortable: true,
    align: 'left',
    headerStyle: 'font-weight: bold; font-size: medium'
  },
  {
    name: 'category',
    label: 'Category',
    field: 'category',
    sortable: true,
    align: 'left',
    headerStyle: 'font-weight: bold; font-size: medium'
  },
  {
    name: 'price',
    label: 'Price',
    field: 'price',
    sortable: true,
    align: 'left',
    headerStyle: 'font-weight: bold; font-size: medium'
  },
  {
    name: 'rating',
    label: 'Rating',
    field: (row) => calculateTotalRating(row.reviews),
    sortable: true,
    align: 'left',
    headerStyle: 'font-weight: bold; font-size: medium'
  },
  {
    name: 'actions',
    label: 'Actions',
    field: (row) => row,
    sortable: false,
    align: 'center',
    headerStyle: 'font-weight: bold; font-size: medium'
  }
]

onMounted(async () => {
  await productStore.fetchProducts()
  products.value = productStore.products
  loading.value = false
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

<style lang="sass">
.text-cell
  min-width: 50px
  max-width: 200px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
.container .q-table__title
  font-size: x-large
  font-weight: bold
  text-transform: uppercase
</style>

<script setup>
import { useProductStore } from '@/store/product'
import { onMounted, reactive, watch } from 'vue'
import { formatNumber, pageNumber } from '@/mixins/string'
import SearchBar from '@/components/product/searchBar.vue'
import Actions from '@/components/product/actions.vue'
import Pagination from '@/components/product/pagination.vue'

const data = useProductStore()

onMounted(() => {
  data.getProduct()
})
</script>

<template>
  <div>
    <VCard>
      <VCardTitle>
        <VRow justify="space-between">
          <VCol md="6">
            <p>List Product</p>
          </VCol>
          <VCol
            md="6"
            class="text-right"
          >
            <VBtn
              to="/product/add"
              size="small"
              >Create Product</VBtn
            >
          </VCol>
        </VRow>
      </VCardTitle>

      <VCardSubtitle>
        <SearchBar />
      </VCardSubtitle>

      <VCardText>
        <VTable>
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>SKU</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>WEIGHT</th>
              <th>WIDTH</th>
              <th>HEIGHT</th>
              <th>PRICE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in data.products"
              :key="i"
            >
              <td class="py-3">
                <VImg
                  :width="100"
                  aspect-ratio="16/9"
                  cover
                  :src="item.image"
                ></VImg>
              </td>
              <td>{{ item.sku }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.categoryName }}</td>
              <td>{{ item.weight }}</td>
              <td>{{ item.width }}</td>
              <td>{{ item.height }}</td>
              <td>IDR {{ formatNumber(item.price) }}</td>
              <td>
                <Actions
                  :item="item"
                  :data="data"
                />
              </td>
            </tr>
          </tbody>
        </VTable>
        <Pagination :length="pageNumber(data)" />
      </VCardText>
    </VCard>
  </div>
</template>

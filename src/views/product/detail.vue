<script setup>
import { useProductStore } from '@/store/product'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { formatNumber } from '@/mixins/string'

const route = useRoute()
const data = useProductStore()

onMounted(() => {
  data.getProductDetail(route.params.id)
})
</script>

<template>
  <div v-if="data.detail">
    <VCard :title="data.detail.name">
      <VRow>
        <VCol md="6">
          <VImg
            :width="500"
            aspect-ratio="16/9"
            cover
            :src="data.detail.image"
          ></VImg>
        </VCol>
        <VCol md="6">
          <VTable>
            <tbody>
              <tr>
                <td>SKU</td>
                <td>:</td>
                <td>{{ data.detail.sku }}</td>
              </tr>
              <tr>
                <td>Category Name</td>
                <td>:</td>
                <td>{{ data.detail.categoryName }}</td>
              </tr>
              <tr>
                <td>Length</td>
                <td>:</td>
                <td>{{ data.detail.length }}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>:</td>
                <td>{{ data.detail.height }}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>:</td>
                <td>{{ data.detail.weight }}</td>
              </tr>
              <tr>
                <td>Width</td>
                <td>:</td>
                <td>{{ data.detail.width }}</td>
              </tr>
            </tbody>
          </VTable>
        </VCol>
      </VRow>
      <VCardText>
        <h3>IDR {{ formatNumber(data.detail.price) }}</h3>
        <br />
        <h3>Description</h3>
        <br />
        <p>{{ data.detail.description }}</p>
      </VCardText>
    </VCard>
  </div>
</template>

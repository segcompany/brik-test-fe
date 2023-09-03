<script setup>
import { useProductStore } from '@/store/product'
import { onMounted } from 'vue'
import { formatNumber, pageNumber } from '@/mixins/string'
import Pagination from '@/components/product/pagination.vue'

const data = useProductStore()

onMounted(() => {
  data.getProduct()
})
</script>

<template>
  <VContainer fluid>
    <VRow dense>
      <VCol
        v-for="card in data.products"
        :key="card.title"
      >
        <VCard height="400">
          <VImg
            :src="card.image"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            cover
          >
            <VCardTitle class="text-white">{{ card.name }} </VCardTitle>
          </VImg>

          <VCardSubtitle class="pt-4">IDR {{ formatNumber(card.price) }} </VCardSubtitle>

          <VCardText>
            <p class="cardMax">{{ card.description }}</p>
          </VCardText>

          <VCardActions>
            <VBtn
              color="orange"
              :to="`/product/${card.id}`"
            >
              DETAIL
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>

      <VCol cols="12">
        <Pagination :length="pageNumber(data)" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<style>
.cardMax {
  max-height: calc(1.2em * 4);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>

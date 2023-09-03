<script setup>
import { useProductStore } from '@/store/product'
import { defineProps, reactive, watch } from 'vue'

defineProps(['length'])

const data = useProductStore()

const form = reactive({
  page: 1,
})

watch(
  () => form.page,
  page => {
    data.getProduct({
      page: page - 1,
    })
  },
)
</script>

<template>
  <VRow class="align-self-center">
    <VCol
      md="6"
      cols="12"
    >
      <VPagination
        class="my-4"
        v-model="form.page"
        :length="length"
        rounded="circle"
      />
    </VCol>
  </VRow>
</template>

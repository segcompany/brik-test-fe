<script setup>
import { useProductStore } from '@/store/product'

const data = useProductStore()

const form = reactive({
  search: '',
  count: data.pageCount,
})

watch(
  () => form.search,
  search => {
    if (!search) {
      data.getProduct()
    }
  },
)
watch(
  () => form.count,
  count => {
    data.getProduct({
      count: count,
    })
  },
)

const searchProduct = () => {
  data.getProduct({
    q: form.search,
  })
}
</script>

<template>
  <VRow justify="space-between">
    <VCol
      md="2"
      cols="12"
    >
      <VSelect
        class="my-3"
        :items="[10, 30, 50, 100]"
        label="Item Per Page"
        density="compact"
        v-model="form.count"
      />
    </VCol>
    <VCol
      md="6"
      cols="12"
    >
      <VTextField
        class="my-3"
        v-model="form.search"
        density="compact"
        clearable
        type="text"
        label="Search"
        color="primary"
        append-inner-icon="mdi-magnify"
      >
        <template #append>
          <VBtn
            size="small"
            :icon="$vuetify.display.smAndDown"
            class="mt-n1"
            @click="searchProduct"
          >
            <VIcon icon="mdi-search"></VIcon>
            <span
              v-if="$vuetify.display.mdAndUp"
              class="ms-3"
              >Search</span
            >
          </VBtn>
        </template>
      </VTextField>
    </VCol>
  </VRow>
</template>

<script setup>
import { useProductStore } from '@/store/product'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const data = useProductStore()
const refInputEl = ref()

const form = reactive({
  file: null,
})

onMounted(() => {
  data.setDetailDefault()
  data.getCategory()
})

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target

  form.file = files[0]

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        data.detail.image = fileReader.result
      }
    }
  }
}

const storeProduct = () => {
  data.storeProduct(form)
}
</script>

<template>
  <VCard v-if="data.detail">
    <VCardText>
      <VRow>
        <VCol
          md="6"
          cols="12"
        >
          <VRow align-content="center">
            <VCol
              md="6"
              cols="12"
            >
              <VImg
                :width="200"
                aspect-ratio="16/9"
                cover
                :src="data.detail.image"
              ></VImg>
            </VCol>
            <VCol
              md="6"
              cols="12"
            >
              <VBtn @click="refInputEl?.click()">Upload Image</VBtn>
              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              />
            </VCol>
            <VCol cols="12">
              <VTextarea
                class="my-10"
                rows="8"
                label="Description"
                v-model="data.detail.description"
              />
            </VCol>
          </VRow>
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VRow>
            <VCol cols="12">
              <VTextField
                label="Name"
                density="compact"
                v-model="data.detail.name"
              />
            </VCol>
            <VCol cols="12">
              <VAutocomplete
                :items="data.categories"
                label="Category Name"
                density="compact"
                v-model="data.detail.categoryName"
              ></VAutocomplete>
            </VCol>

            <VCol cols="12">
              <VTextField
                label="Length"
                density="compact"
                type="number"
                v-model="data.detail.length"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                label="Height"
                density="compact"
                type="number"
                v-model="data.detail.height"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                label="Weight"
                density="compact"
                type="number"
                v-model="data.detail.weight"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                label="Width"
                density="compact"
                type="number"
                v-model="data.detail.width"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                label="Price"
                density="compact"
                type="number"
                v-model="data.detail.price"
              />
            </VCol>
            <VCol cols="12">
              <VBtn
                @click="storeProduct"
                :disabled="data.loading"
                >{{ data.loading ? 'Waiting...' : 'SUBMIT' }}</VBtn
              >
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

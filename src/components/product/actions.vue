<script setup>
import { defineProps } from 'vue'

defineProps(['item', 'data'])
</script>

<template>
  <VMenu transition="scale-transition">
    <template v-slot:activator="{ props }">
      <VBtn
        icon="mdi-dots-vertical"
        v-bind="props"
        variant="text"
        color="secondary"
      >
      </VBtn>
    </template>
    <VCard min-width="200">
      <VList>
        <VListItem
          :value="item.id"
          :to="`/product/${item.id}`"
        >
          <template v-slot:prepend>
            <VIcon icon="mdi-eye"></VIcon>
          </template>
          <VListItemTitle>Detail</VListItemTitle>
        </VListItem>
      </VList>
      <VList>
        <VListItem
          :value="item.id"
          :to="`/product/edit/${item.id}`"
        >
          <template v-slot:prepend>
            <VIcon icon="mdi-pencil"></VIcon>
          </template>
          <VListItemTitle>Edit</VListItemTitle>
        </VListItem>
      </VList>
      <VList>
        <VListItem
          :value="item.id"
          @click="data.deleteProduct(item.id)"
        >
          <template v-slot:prepend>
            <VIcon icon="mdi-delete"></VIcon>
          </template>
          <VListItemTitle>Delete</VListItemTitle>
        </VListItem>
      </VList>
    </VCard>
  </VMenu>
</template>

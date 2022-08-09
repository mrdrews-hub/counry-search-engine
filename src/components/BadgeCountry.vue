<script setup>
const props = defineProps({
  text: String
})
</script>

<template>
  <span class="badge badge-md px-4 h-6 bg-secondary border-none shadow-sm text-white">{{  props.text }}</span>
</template>
<script setup>
const props = defineProps({
  title: String,
  content: [String, Number]
})
</script>

<template>
<div class="simple-card p-6 border shadow-md w-[540px] h-[143px] relative overflow-hidden">
  <slot name="card-title">
    <p class="font-bold">{{ props.title }}</p>
  </slot>
  <slot name="card-body">
    <div class="flex mt-3">
      <p class="font-bold text-5xl text-primary">{{ props.content }}</p>
    </div>
  </slot>
  <slot name="card-bg"></slot>
  <slot name="card-footer"></slot>
</div>
</template>
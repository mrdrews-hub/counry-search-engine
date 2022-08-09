<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
<RouterLink to="/" class="btn bg-primary gap-2 mt-14 normal-case font-normal text-white">
  <slot name="icon"></slot>
  <slot></slot>
</RouterLink>
</template>
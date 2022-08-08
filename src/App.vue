<script setup>
import HelloWorld from './components/HelloWorld.vue'
import DefaultLayout from './layouts/default.vue'
import { RouterView } from 'vue-router'
</script>

<template>
<DefaultLayout>
  <RouterView />
</DefaultLayout>
</template>

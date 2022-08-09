<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import { useDebouncedRef } from '../utils/debounceRef'
import axios from 'axios'

const router = useRouter()
const keyword = useDebouncedRef('')
const result = ref([])
const isError = ref(false)
const loading = ref(false)
const searchInput = ref(null)

watch(keyword, async() => {
  if(keyword.value.length > 0) {
    loading.value = true
    try {
      const response = await axios.get(`https://restcountries.com/v2/name/${keyword.value}`)
      if(response.status === 200 && response.statusText === 'OK') {
        isError.value = false
        result.value = response.data
      }
    } catch (error) {
      isError.value = true
    } finally {
      loading.value = false
    }
  } else {
    result.value = []
    isError.value = false
  }
})

const navigate = (country) => {
  router.push(`/details/${country}`)
}

onMounted(() => {
  searchInput.value.focus()
})
</script>
<template>
<div class="search">
  <div class="search flex items-center justify-center relative max-w-2xl mx-auto px-2 md:px-0">
    <input type="text" placeholder="Type any country name" class="peer input input-xl w-full input-bordered text-lg focus:outline-2 focus:outline-primary placeholder:text-gray-300" v-model="keyword" ref="searchInput"/>
      <!-- Loading -->
      <svg
        version="1.1"
        id="L9"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        class="fill-primary absolute right-1"
        x="0px" y="0px" width="45" height="45" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" v-if="loading">
        <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
          <animateTransform 
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite" />
        </path>
    </svg>

    <!-- Search Icons -->
    <svg class="absolute right-3 fill-gray-400 peer-focus:fill-primary" width="23" height="23" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" v-else>
      <path
        d="M8.875 0.75C11.0299 0.75 13.0965 1.60602 14.6202 3.12976C16.144 4.65349 17 6.72012 17 8.875C17 10.8875 16.2625 12.7375 15.05 14.1625L15.3875 14.5H16.375L22.625 20.75L20.75 22.625L14.5 16.375V15.3875L14.1625 15.05C12.6882 16.3085 10.8134 16.9999 8.875 17C6.72012 17 4.65349 16.144 3.12976 14.6202C1.60602 13.0965 0.75 11.0299 0.75 8.875C0.75 6.72012 1.60602 4.65349 3.12976 3.12976C4.65349 1.60602 6.72012 0.75 8.875 0.75ZM8.875 3.25C5.75 3.25 3.25 5.75 3.25 8.875C3.25 12 5.75 14.5 8.875 14.5C12 14.5 14.5 12 14.5 8.875C14.5 5.75 12 3.25 8.875 3.25Z"/>
    </svg>
  </div>

  <div class="result mt-1">
    <ul class="menu bg-white shadow-md max-w-2xl mx-auto h-max max-h-80 overflow-auto" v-if="result.length > 0">
      <template v-if="!isError">
        <li v-for="country in result" :key="country.name">
          <a @click="navigate(country.name)">{{country.name}}</a>
        </li>
      </template>
      <template v-else>
        <li>
          <p class="text-red-500">Data not found</p>
        </li>
      </template>
    </ul>
  </div>
</div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: lightcoral; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: coral; 
}
</style>
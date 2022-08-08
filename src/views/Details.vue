<script setup>
import axios from 'axios';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import BadgeCountry from '../components/BadgeCountry.vue';
import SimpleCard from '../components/SimpleCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ButtonLink from '../components/ButtonLink.vue';
import ToolTip from '../components/ToolTip.vue';

const route = useRoute()
const country = ref([])
const sameCallingCode = ref([])
const sameCurrency = ref([])
const isError = ref(false)
const loading = ref(false)

const fetchCountry = async () => {
  loading.value = true
  try {
    const countries = (await axios.get(`https://restcountries.com/v2/name/${route.params.country}?fullText=true`)).data
    if(countries.length > 0) {
        sameCallingCode.value = (await axios.get(`https://restcountries.com/v2/callingcode/${countries[0].callingCodes[0]}`)).data
        sameCurrency.value = (await axios.get(`https://restcountries.com/v2/currency/${countries[0].currencies[0].code}`)).data
    }
    country.value = countries[0]
  } catch (error) {
    isError.value = true
  } finally {
    loading.value = false
  }
}
watchEffect(fetchCountry)
</script>
<template>
<div class="container mx-auto px-2 md:px-0" v-if="!loading">
<ButtonLink>
  <template #icon>
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1L1 8L8 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1 8H17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </template>
  Back to Homepage
</ButtonLink>

<section id="details" class="mt-16">
  <div class="flex items-center">
    <h1 class="text-5xl font-bold mr-4">{{ country.name }}</h1>
    <img :src="country.flags.png" alt="" class="w-[48px] h-[30px]">
  </div>
  <div class="flex gap-1 mt-2 mb-8">
    <BadgeCountry v-for="(name,index) in country.altSpellings" :key="index" :text="name"></BadgeCountry>
  </div>
  <div class="card-container flex flex-col md:flex-row gap-6">
    <SimpleCard
      title="LatLong"
      :content="`${Number(country.latlng[0]).toFixed(1)}, ${Number(country.latlng[1]).toFixed(1)}`"
    >
      <template #card-bg>
        <svg width="204" height="204" viewBox="0 0 496 512" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-5 right-0">
          <path d="M248 8C111.03 8 0 119.03 0 256C0 392.97 111.03 504 248 504C384.97 504 496 392.97 496 256C496 119.03 384.97 8 248 8ZM408 223.5V230.43C408 236.3 404.68 241.67 399.43 244.29L384.04 251.99C381.596 253.213 378.872 253.768 376.144 253.597C373.417 253.427 370.783 252.538 368.51 251.02L350.3 238.88C348.336 237.572 346.099 236.729 343.759 236.415C341.42 236.101 339.04 236.325 336.8 237.07L334.15 237.95C324.45 241.18 320.49 252.74 326.16 261.25L339.4 281.11C342.27 285.42 347.11 288.01 352.29 288.01H360.5C369.06 288.01 376 294.95 376 303.51V314.85C376 318.2 374.91 321.47 372.9 324.15L354.16 349.13C352.74 351.03 351.77 353.23 351.33 355.56L347.03 378.39C346.41 381.68 344.74 384.68 342.27 386.95C332.793 395.628 324.399 405.419 317.27 416.11L304.24 435.66C301.706 439.461 298.272 442.578 294.244 444.735C290.217 446.891 285.719 448.019 281.15 448.02C270.64 448.02 261.03 442.08 256.33 432.68C250.851 421.723 247.999 409.641 248 397.39V367.5C248 358.94 241.06 352 232.5 352H206.62C192.13 352 178.24 346.24 167.99 336C157.748 325.753 151.993 311.858 151.99 297.37V283.31C151.99 266.12 160.09 249.93 173.84 239.61L201.42 218.92C210.877 211.828 222.379 207.993 234.2 207.99H235.09C243.57 207.99 251.94 209.96 259.52 213.76L274.24 221.12C277.92 222.96 282.17 223.26 286.07 221.96L333.38 206.19C339.71 204.08 343.98 198.16 343.98 191.49C343.98 182.93 337.04 175.99 328.48 175.99H318.39C314.28 175.99 310.34 174.36 307.43 171.45L300.51 164.53C299.071 163.09 297.362 161.948 295.482 161.169C293.601 160.39 291.586 159.99 289.55 159.99H199.5C190.94 159.99 184 153.05 184 144.49V140.09C184 132.98 188.84 126.78 195.74 125.05L210.19 121.44C213.93 120.5 217.19 118.21 219.33 115L227.41 102.89C230.28 98.58 235.12 95.99 240.3 95.99H264.51C273.07 95.99 280.01 89.05 280.01 80.49V58.79C359.23 71.63 422.86 131.02 441.93 208H423.5C414.94 208 408 214.94 408 223.5Z" fill="black" fill-opacity="0.05"/>
        </svg>
      </template>
    </SimpleCard>
    <SimpleCard>
      <template #card-body>
        <div class="flex flex-col gap-y-2">
          <p>Capital: <b>{{ country.capital }}</b></p>
          <p>Region: <b>{{ country.region }}</b></p>
          <p>Sub-Region: <b>{{ country.subregion }}</b></p>
        </div>
      </template>
    </SimpleCard>
  </div>
  <div class="card-container flex flex-col md:flex-row gap-6 mt-8">
    <SimpleCard 
      title="Calling Code"
      :content="country.callingCodes[0]"
      class="border-none shadow-none">
      <template #card-footer>
        <ToolTip :tooltipText="`${sameCallingCode.length} country`" :offset="12" class="mt-2">
          <template #default>with this currency</template>
          <template #content>
            <ul class="bg-base flex flex-col gap-y-2 p-5">
              <li class="font-normal" v-for="country in sameCallingCode"><a>{{country.name}}</a></li>
            </ul>
          </template>
        </ToolTip>
      </template>
    </SimpleCard>


    <SimpleCard 
      title="Currency"
      :content="country.currencies[0].code"
      class="border-none shadow-none">
      <template #card-footer>
        <ToolTip :tooltipText="`${sameCurrency.length} country`" :offset="12" class="mt-2">
          <template #default>with this currency</template>
          <template #content>
            <ul class="bg-base flex flex-col gap-y-2 p-5">
              <li class="font-normal" v-for="country in sameCurrency"><a>{{country.name}}</a></li>
            </ul>
          </template>
        </ToolTip>
      </template>
    </SimpleCard>
  </div>
</section>
</div>
<div v-else class="absolute inset-0 flex justify-center items-center">
  <LoadingSpinner></LoadingSpinner>
</div>
</template>
<style scoped>
#tooltip {
  background: #525252;
  color: white;
  font-size: 14px;
  border-radius: 14px;
  display: none;
}
#tooltip[data-show] {
  display: block;
}
#tooltip[data-popper-placement^='top'] > #arrow {
  bottom: -4px;
}

#tooltip[data-popper-placement^='bottom'] > #arrow {
  top: -4px;
}

#tooltip[data-popper-placement^='left'] > #arrow {
  right: -4px;
}

#tooltip[data-popper-placement^='right'] > #arrow {
  left: -4px;
}
</style>